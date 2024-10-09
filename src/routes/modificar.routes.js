const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/modificar.controller');
const validacion = require('../validations/validaciones')


//Supervisor
route.post(url.supervisor.modificar.modificarEmpleado, validacion.modificacionesValidacion.modificarEmpleado, controller.modificarEmpleado);

module.exports = route;