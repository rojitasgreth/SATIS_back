const nodemailer = require('nodemailer');
const { resolve } = require('path');
const { rejects } = require('assert');
require('dotenv').config({ path: resolve(__dirname, "../../.env") })
console.log(process.env.USER_EMAIL);

const configureEmailService = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SERVICE,
    secure: true,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.CLAVE_EMAIL
    },
    tls: {
      rejectUnauthorized: false
    },
    proxy: process.env.PROXY
  });

  return transporter;
};


const sendEmail = (to, subject, html, attachments) => {
  const transporter = configureEmailService();

  // Opciones del correo electrónico
  const mailOptions = {
      from: process.env.USER_EMAIL,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments
  };

  // Envío del correo electrónico
  return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error('Error al enviar correo:', error);
              reject(error);
          } else {
              resolve(info);
          }
      });
  });
};


function EmailFormatUser() {

  const msj = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenida al sitio de la API de la división político territorial</title>
</head>
<body style="margin: 0; padding: 0; font-size: 14px; color: #153643;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td style="padding: 10px 0 10px 0;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                  <tr>
                      <td bgcolor="#ffffff" style="padding: 40px 30px 40px 40px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                  <td>
                                    <center><h2>¡Gracias por su compra en Textiles Satis!</h2></center>
                                      <p>Estimado cliente</p>
                                      <p>En Textiles Satis nos complace enormemente que haya confiado nuevamente en nosotros para abastecer su tienda con la mejor ropa para bebés.
                                         Agradecemos su constante preferencia y queremos asegurarnos de que su experiencia de compra haya sido completamente satisfactoria.
                                         Nuestro equipo de logística se pondrá en contacto con usted en breve para coordinar la entrega de su pedido y resolver cualquier duda que pueda tener.</p>
                                      <p>Estamos seguros de que la calidad y variedad de nuestras prendas serán un éxito entre sus clientes.</p>
                                      <p>Para cualquier consulta adicional, no dude en contactarnos a través de nuestro número telefónico 0212-7303477 o por correo electrónico a satistextiles@gmail.com.</p>
                                      <p>¡Esperamos seguir siendo su proveedor de confianza!</p>
                                      <p>Atentamente:</p>
                                      <p>El equipo de Textiles Satis</p>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
</body>

</html>`;
  return msj;
}

module.exports = {
  configureEmailService,
  sendEmail,
  EmailFormatUser
};