const express = require('express');
const route = express.Router();
const controller = require('../controllers/pdf.controller');
const validacion = require('../validations/validaciones')
const url = require("../url.json");

route.post(url.PDF.generateInvoicePDF, controller.createInvoice);

module.exports = route;
