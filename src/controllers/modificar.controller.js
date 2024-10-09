const { validationResult } = require('express-validator');
const model = require('../models/modificar.model');


// Supervisor
async function modificarEmpleado(req, res) {
    const errors = validationResult(req);
   if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
   model.modificarEmpleado(req.body, (error, data) => {
       if (error) {
           return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
       }
       res.status(200).json(data); 
   });
}

module.exports = {
    modificarEmpleado
}