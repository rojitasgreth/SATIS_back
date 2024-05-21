const servicioCorreo = require('../models/servicioCorreo.model');

const servicioEnviarCorreo = (req, res) => {
  const { to, subject, text } = req.body;

  servicioCorreo.sendEmail(to, subject, text);

  res.send('Correo electrónico enviado');
};

const correoRecuperacion = (req, res) => {
  const { to, subject, text } = req.body;

  servicioCorreo.sendEmail(to, subject, text);

  res.send('Correo electrónico enviado');
};

module.exports = {
    servicioEnviarCorreo
};