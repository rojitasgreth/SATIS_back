const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/eliminacion.controller');
const validacion = require('../validations/validaciones')


//Supervisor
route.post(url.supervisor.eliminacion.eliminarEmpleado, validacion.eliminacionValidacion.eliminarEmpleado, controller.eliminarEmpleado);

module.exports = route;