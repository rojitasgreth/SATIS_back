const generateInvoicePDF = require('../models/pdf.model'); // Ajusta el path según tu estructura de archivos
const { validationResult } = require('express-validator');

async function createInvoice(req, res) {
  console.log('controladooorr');
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() });
  generateInvoicePDF.generateInvoicePDF(req.body, (error, data) => {
    if (error) {
        return res.status(500).json({ code: 500, message: 'Internal Server Error...', error: error });
    }
    res.status(200).json(data); 
});
}

module.exports = {
  createInvoice
};





