const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/listados.controller');
const validacion = require('../validations/validaciones')

route.post(url.listados.listarOrdenes, validacion.listadosValidacion.listarOrdenes, controller.listarOrdenes);
route.post(url.listados.listarOrden, controller.listarOrden);
route.post(url.listados.listarProductos ,validacion.listadosValidacion.listarProductos, controller.listarProductos);
route.post(url.listados.listarProductosGeneral , controller.listarProductosGeneral);
route.post(url.listados.listarProductoIndividual , controller.listarProductoIndividual);
route.post(url.listados.listarCliente ,validacion.listadosValidacion.listarCliente, controller.listarCliente);
route.post(url.listados.listarColores ,validacion.listadosValidacion.listarColores, controller.listarColores);
route.post(url.listados.listarDetalles , controller.listarDetalles);


module.exports = route;