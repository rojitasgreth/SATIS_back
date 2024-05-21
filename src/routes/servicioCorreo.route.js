const express = require('express');
const route = express.Router();
const url = require("../url.json");
const servicioCorrreoControl = require('../controllers/servicioCorreo.controller');

route.post(url.servicioCorreo.servicioCorreo, servicioCorrreoControl.servicioEnviarCorreo);

module.exports = route;