const { validationResult } = require('express-validator');

async function index(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send({ code: 204, message: 'Validation Errors', errors: errors.array() })
    res.send("{code:200,message:'SATIS...'}")
}

module.exports = {
    index
}