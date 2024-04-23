const {dbconn} = require('../bd/index');

async function listarOrdenes(data, callback){
    try {
        let {idUser} = data;

        let sql = `SELECT id, fecha, estatus_finalizado, estatus_correo, razon_social FROM orden_compra oc inner join clientes as cl ON oc.id_cliente = cl.id WHERE id_usuario = ${idUser};`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0]

        console.log(obj, 'holaaa');

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
        let {Condicion} = data;
        let obj;

        if (Condicion == 1) {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio, total FROM detalle_categoria;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (Condicion == 2) {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio_con_envio, total_con_envio FROM detalle_categoria;`;
            let outSql = await dbconn.query(sql);
            obj = outSql[0]
        }

        if (Condicion == 3) {
            let sql = `SELECT cod_categoria, categoria, descripcion, cantidad_piezas, precio_dist, total_dist FROM detalle_categoria;`;
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
    listarProductos,
    listarCliente,
    listarColores,
    listarDetalles
}
