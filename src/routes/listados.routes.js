const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/listados.controller');
const validacion = require('../validations/listados.validaciones')

route.post(url.listados.listarOrdenes, validacion.listadosValidacion.listarOrdenes, controller.listarOrdenes);
route.post(url.listados.listarProductos , controller.listarProductos);
route.post(url.listados.listarProductoIndividual , controller.listarProductoIndividual);
route.post(url.listados.listarCliente , controller.listarCliente);
route.post(url.listados.listarColores , controller.listarColores);
route.post(url.listados.listarDetalles , controller.listarDetalles);


module.exports = route;