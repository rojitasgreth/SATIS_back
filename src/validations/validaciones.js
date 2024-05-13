const { check } = require('express-validator');


const notempty = 'No puede estar vacio';
const notnumeric ='No es un numero';
const notvarchar ='No es un string';
const notlength = 'No cumple con la longitud';
const notInTlf = "Codigo de area incorrecto";
const notEmail = "Email invalido"

const listadosValidacion = {
    listarOrdenes: [
        check('idUser')
            .notEmpty().withMessage(notempty)
            .isNumeric().withMessage(notnumeric) 
        ],
    listarProductos: [
        check('Condicion')
            .notEmpty().withMessage(notempty)
            .isString().withMessage(notvarchar),

        //check('Envio')
            //.notEmpty().withMessage(notempty)
            //.isString().withMessage(notvarchar)
    ],
    listarCliente: [
        check('RIF')
            .notEmpty().withMessage(notempty)
            .isNumeric().withMessage(notnumeric) 
            .isLength({min:8, max:9}).withMessage(notlength) 
    ],
    listarColores: [
        check('cod_categoria')
            .notEmpty().withMessage(notempty)
            .isString().withMessage(notvarchar)
            .isLength({min:5, max:5}).withMessage(notlength),

        check('genero')
            .notEmpty().withMessage(notempty)
            .isString().withMessage(notvarchar)
            .isLength({min:1, max:1}).withMessage(notlength),
    ],
    listarDetalles: [
        check('idUser')
            .notEmpty().withMessage(notempty)
            .isNumeric().withMessage(notnumeric),

        check('idCompra')
        .notEmpty().withMessage(notempty)
        .isNumeric().withMessage(notnumeric),
    ]
     }

const insercionesValidacion = { 
    insertarCliente: [
        check('rif')
            .notEmpty().withMessage(notempty)
            .isNumeric().withMessage(notnumeric) 
            .isLength({min:8, max:9}).withMessage(notlength),
        check('razon_social')
            .notEmpty().withMessage(notempty)
            .isLength({min:5, max:100}).withMessage(notlength),
        check('telefono')
            .notEmpty().withMessage(notempty)
            .isLength({min:11, max:11}).withMessage(notlength)
            .isNumeric().withMessage(notnumeric) 
            .not().isIn(['0424','0412','0414','0416','0426','0248','0281','0282','0283','0285','0292','0240','0247','0278','0243','0244','0246','0273','0278','0284','0285','0286','0288','0289','0241','0242','0243','0245','0249','0258','0287','0212','0259','0268','0269','0279','0235','0238','0246','0247','0251','0252','0253','0271','0274','0275','0234','0239','0287','0291','0292','0295','0255','0256','0257','0272','0293','0294','0276','0277','0278','0272','0254','0261','0262','0263','0264','0265','0266','0267']).withMessage(notInTlf),
        check('correo')
            .notEmpty().withMessage(notempty)
            .isEmail().withMessage(notEmail),
        check('estado')
            .notEmpty().withMessage(notempty)
            .isString().withMessage(notvarchar),
        check('calle')
            .notEmpty().withMessage(notempty)
            .isString().withMessage(notvarchar),
        ]
     }

module.exports = {
    listadosValidacion,
    insercionesValidacion
 }