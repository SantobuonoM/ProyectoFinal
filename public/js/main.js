const socket = io.connect();

socket.on("from-server-productos", (productos) => {
  render_productos(productos);
});

function render_productos(productos) {
  const cuerpoMensajesHTML = productos
    .map((prod) => {
      return `
            <tr>
                <td>${prod.title}</td>
                <td>${prod.price}</td>
                <td><img src="${prod.thumbnail}" width="30"></td>
            </tr>
        `;
    })
    .join("");

  document.querySelector("#historialProductos").innerHTML = cuerpoMensajesHTML;
}

socket.on("mensajes", (mensajesN) => {
  let mensajesNSize = JSON.stringify(mensajesN).length;

  let mensajesD = normalizr.denormalize(
    mensajesN.result,
    schemaMensajes,
    mensajesN.entities
  );
  let mensajesDsize = JSON.stringify(mensajesD).length;

  let porcentajeC = parseInt((mensajesNSize * 100) / mensajesDsize);

  render(mensajesD.mensajes);
});

function enviarMensaje() {
  const inputMensaje = document.getElementById("contenidoMensaje");
  const PublicarMensaje = document.getElementById("btnEnviar");

  const mensaje = {
    author: {
      email: document.getElementById("email").value,
      nombre: document.getElementById("firstname").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("edad").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: document.getElementById("contenidoMensaje").value,
  };

  socket.emit("nuevoMensaje", mensaje);
}

function render(mensaje) {
  const cuerpoMensajesHTML = mensaje
    .map((msj) => {
      return `
            <span><b style="color: blue;">${msj.author["email"]}</b> <span style="color: brown;">[${msj.fyh}]</span>:</span><span style="color: green; font-style: italic;"> ${msj.text} <img src='${msj.author["avatar"]}' width="30px"/></span>
        `;
    })
    .join("<br>");

  document.querySelector("#historialChat").innerHTML = cuerpoMensajesHTML;
}

/////////////////////////////////////////////////////////////////////

//Agrega productos al carrito y devuelve feedback
const producto_especifico = document.querySelectorAll(".agregar");
producto_especifico.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    btn.textContent = "Producto agregado";
    setTimeout(() => {
      btn.textContent = "Agregar al Carrito";
    }, 2000);
    const producto = {
      id: e.target.dataset.id,
      title: e.target.parentElement.children[0].textContent,
      price: e.target.parentElement.children[1].textContent,
      categoria: e.target.parentElement.children[2].textContent,
      thumbnail: e.target.parentElement.querySelector("img").src,
      cantidad: 1,
    };
    await fetch("/carrito/productos", {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
});

//Elimina productos del carrito
const producto_eliminar = document.querySelectorAll(".eliminar");
producto_eliminar.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    await fetch(`/carrito/productos/${e.target.dataset.id}`, {
      method: "DELETE",
    });
  });
});

//Enviar mensaje al finalizar compra
const finalizarCompra = document.querySelector(".comprar");
finalizarCompra.addEventListener("click", async () => {
  finalizarCompra.textContent = "Compra realizada!";
  await fetch("/carrito/compra_finalizada", {
    method: "POST",
  });
});
