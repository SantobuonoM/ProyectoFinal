import { logger } from "./logger.config.js";
import { createTransport } from "nodemailer";
import twilio from "twilio";

import dotenv from "dotenv";
dotenv.config();

const EMAIL_ACCOUNT = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.PASSWORD;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendMensajeCompra = async (user, compra) => {
  const { username, email, direccion, edad, telefono } = user;

  let body = `Nuevo pedido de ${username}`;

  const productos = compra.productos;

  productos.forEach(
    (prod) =>
      (body += `
        ${prod.title} ${prod.price} x${prod.cantidad}
    `)
  );

  try {
    await client.messages.create({
      from: process.env.TWILIO_NUMBER,
      body: body,
      to: process.env.MI_NUMERO,
    });

    await client.messages.create({
      from: process.env.TWILIO_NUMBER,
      body: `Hola ${username}, hemos recibido tu pedido y lo estamos procesando!, Muchas gracias`,
      to: `whatsapp:${telefono}`,
    });
  } catch (error) {
    logger.warn(error);
  }
};

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: EMAIL_ACCOUNT,
    pass: EMAIL_PASSWORD,
  },
});

const enviarEmail = async (user) => {
  const { username, email, direccion, edad, telefono } = user;
  const mailOptions = {
    from: "NodeJS app <no-reply@example.com>",
    to: EMAIL_ACCOUNT,
    subject: "Nuevo registro",
    html: `<h1>Nuevo Registro de ${username}!</h1>
        <h3>Datos del usuario</h3>
        <ul>
          <li>Email: ${email}</li>
          <li>Dirección: ${direccion}</li>
          <li>Edad: ${edad}</li>
          <li>Teléfono: ${telefono}</li>
        </ul>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(info);
  } catch (error) {
    logger.warn(error);
  }
};

const enviarEmailCompra = async (user, compra) => {
  const { username, email, direccion, edad, telefono } = user;

  const mailOptions = {
    from: "NodeJS app <no-reply@example.com>",
    to: EMAIL_ACCOUNT,
    subject: "Nuevo pedido",
  };

  let html = `<h1>Nuevo pedido de ${username}!</h1>
        <h3>Datos del usuario</h3>
        <ul>
          <li>Email: ${email}</li>
          <li>Dirección: ${direccion}</li>
          <li>Edad: ${edad}</li>
          <li>Teléfono: ${telefono}</li>
        </ul>

        <h2>Lista de productos pedido</h2>
        
        <ul> `;

  const productos = compra.productos;

  productos.forEach(
    (prod) =>
      (html += `
        <li>
            <p>${prod.title} $${prod.price} x${prod.cantidad}</p>
        </li>
    `)
  );
  html += "</ul>";

  mailOptions.html = html;

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(info);
  } catch (error) {
    logger.warn(error);
  }
};

export { enviarEmail, enviarEmailCompra, sendMensajeCompra };
