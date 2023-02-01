const numeroAleatorio = () => {
    return Math.floor(Math.random() * 1000 + 1);
};
  
const coincidencias = (cant) => {
    const numeros = {};
    while (cant > 0) {
        const num = numeroAleatorio();
        numeros[num] ? numeros[num] += 1 : numeros[num] = 1;
        cant -= 1;
    }
    return numeros;
};
  
process.on('message', msg => {
    const numeros = coincidencias(msg.cant);
    process.send({ numeros });
});

process.send('Proceso terminado');
  