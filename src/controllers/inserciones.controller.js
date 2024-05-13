const { validationResult } = require('express-validator');
const model = require('../models/inserciones.model');

async function insertarCliente(req, res) {
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
    model.insertarCliente(req.body, (error, data) => {
        if (error) {
            return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
        }
        res.status(200).json(data); 
    });
}


async function insertarOrden(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.insertarOrden(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

module.exports = {
    insertarCliente,
    insertarOrden
}