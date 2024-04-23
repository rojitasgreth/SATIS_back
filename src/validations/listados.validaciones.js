const { check } = require('express-validator');

const notempty = 'No puede estar vacio';
const notnumeric ='No es un numero';


const listadosValidacion = {
    listarOrdenes: [
        check('idUser')
            .notEmpty().withMessage(notempty)
            .isNumeric().withMessage(notnumeric) 
        ]
     }

module.exports = {
listadosValidacion
 }