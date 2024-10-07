const { validationResult } = require('express-validator');
const model = require('../models/listados.model');


// Vendedor
async function listarOrdenes(req, res) {
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
    model.listarOrdenes(req.body, (error, data) => {
        if (error) {
            return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
        }
        res.status(200).json(data); 
    });
}
async function listarProductos(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarProductos(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

async function listarProductosGeneral(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarProductosGeneral(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

async function listarProductoIndividual(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarProductoIndividual(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

async function listarCliente(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarCliente(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

async function listarColores(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarColores(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

async function listarDetalles(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarDetalles(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

async function listarOrden(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarOrden(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}



// Supervisor
async function listarVendedores(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.listarVendedores(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}


module.exports = {
    listarOrdenes,
    listarOrden,
    listarProductos,
    listarProductosGeneral,
    listarProductoIndividual,
    listarCliente,
    listarColores,
    listarDetalles,

    listarVendedores
}