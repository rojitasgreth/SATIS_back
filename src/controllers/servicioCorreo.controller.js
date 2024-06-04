const servicioCorreo = require('../models/servicioCorreo.model');

const servicioEnviarCorreo = (req, res) => {
  const { to, subject, text, attachments} = req.body;

  servicioCorreo.sendEmail(to, subject, text, attachments);

  res.send('Correo electrónico enviado');
};

module.exports = {
    servicioEnviarCorreo
};