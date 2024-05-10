const {dbconn} = require('../bd/index');

async function listarOrdenes(data, callback){
    try {
        let {idUser} = data;
        console.log(data);

        let sql = `SELECT oc.id, fecha, estatus_finalizado, estatus_correo, razon_social FROM orden_compra oc inner join clientes as cl ON oc.id_cliente = cl.id WHERE id_usuario = ${idUser};`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0];

        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error listar');
        callback(error, null);
    }
}

async function listarOrden(data, callback){
    try {
        let {idUser, idOrden} = data;
        console.log(data);

        let sql = `SELECT dor.id as id_orden, oc.fecha, condiciones, tipo_envio, razon_social, rif, telefono, correo, estado, calle, edificio, descripcion, dor.genero, dco.descripcion_color,cantidad 
                   FROM orden_compra oc 
                   INNER JOIN clientes as cl ON oc.id_cliente = cl.id 
                   INNER JOIN detalle_orden dor ON oc.id = dor.id_orden
                   INNER JOIN detalle_categoria dc ON dc.cod_categoria = dor.cod_categoria
                   INNER JOIN detalle_colores dco ON  dco.codigo_color = dor.cod_color AND dco.categoria = dor.cod_categoria AND dco.genero = dor.genero
                   WHERE id_usuario = ${idUser} AND dor.id = ${idOrden}`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0];

        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error listar');
        callback(error, null);
    }
}

async function listarProductos(data, callback){
    try {
        let {Condicion, Envio} = data;
        let obj;

        if (Condicion != 'Distribuidor') {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio, total, img FROM detalle_categoria;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (Envio == 'Nacional') {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio_con_envio, total_con_envio, img FROM detalle_categoria;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (Condicion == 'Distribuidor') {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio_dist, total_dist, img FROM detalle_categoria;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error listado');
        callback(error, null);
    }
}

async function listarProductosGeneral(data, callback){
    try {

        let obj;

            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, img FROM detalle_categoria ORDER BY categoria;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        
        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error listado');
        callback(error, null);
    }
}

async function listarProductoIndividual(data, callback){
    try {
        let {Condicion, Envio, Codigo} = data;
        let obj;

        if (Condicion != 'Distribuidor') {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio, total, img FROM detalle_categoria WHERE cod_categoria = '${Codigo}';`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (Envio == 'Nacional') {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio_con_envio, total_con_envio, img FROM detalle_categoria WHERE cod_categoria = '${Codigo}' ;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (Condicion == 'Distribuidor') {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio_dist, total_dist, img FROM detalle_categoria WHERE cod_categoria = '${Codigo}';`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error listado');
        callback(error, null);
    }
}

async function listarCliente(data, callback){
    try {
        let {RIF} = data;

        let sql = `SELECT * FROM clientes WHERE rif = '${RIF}';`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0][0]

        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error cliente');
        callback(error, null);
    }
}

async function listarColores(data, callback){
    try {
        let {cod_categoria, genero} = data;

        let sql = `SELECT codigo_color, descripcion_color FROM detalle_colores WHERE genero = '${genero}' AND categoria = '${cod_categoria}';`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0];


        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error color');
        callback(error, null);
    }
}

async function listarDetalles(data, callback){
    try {
        let {idUser, idCompra} = data;

        let sql = ` SELECT oc.id as id_orden_compra, fecha, razon_social, rif, telefono, correo, estado, calle, edificio, condiciones, tipo_envio, estatus_finalizado, estatus_correo, cod_categoria, dc.genero, cod_color, descripcion_color,cantidad 
                    FROM orden_compra as oc
                    INNER JOIN detalle_orden as deo  
                    ON oc.id = deo.id_orden  
                    INNER JOIN detalle_colores as dc
                    ON deo.genero = dc.genero AND deo.cod_categoria = dc.categoria AND deo.cod_color = dc.codigo_color
                    INNER JOIN clientes as c
                    ON c.id = oc.id_cliente
                    WHERE id_usuario = ${idUser} AND oc.id = ${idCompra};`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0];


        if (obj == undefined) {
            callback(null, 'VACIO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error Detalles');
        callback(error, null);
    }
}

module.exports = {
    listarOrdenes,
    listarOrden,
    listarProductos,
    listarProductosGeneral,
    listarProductoIndividual,
    listarCliente,
    listarColores,
    listarDetalles
}
