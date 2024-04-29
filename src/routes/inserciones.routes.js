const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/inserciones.controller');
const validacion = require('../validations/validaciones')

//route.post(url.listados.listarOrdenes, validacion.listadosValidacion.listarOrdenes, controller.listarOrdenes);
route.post(url.inserciones.insertarCliente,validacion.insercionesValidacion.insertarCliente, controller.insertarCliente);

module.exports = route;