const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/listados.controller');
const validacion = require('../validations/validaciones')

//Vendedor
route.post(url.vendedor.listados.listarOrdenes, validacion.listadosValidacion.listarOrdenes, controller.listarOrdenes);
route.post(url.vendedor.listados.listarOrden, controller.listarOrden);
route.post(url.vendedor.listados.listarProductos ,validacion.listadosValidacion.listarProductos, controller.listarProductos);
route.post(url.vendedor.listados.listarProductosGeneral , controller.listarProductosGeneral);
route.post(url.vendedor.listados.listarProductoIndividual , controller.listarProductoIndividual);
route.post(url.vendedor.listados.listarCliente ,validacion.listadosValidacion.listarCliente, controller.listarCliente);
route.post(url.vendedor.listados.listarColores ,validacion.listadosValidacion.listarColores, controller.listarColores);
route.post(url.vendedor.listados.listarDetalles , controller.listarDetalles);


//Supervisor
route.post(url.supervisor.listarVendedores, controller.listarVendedores);


module.exports = route;