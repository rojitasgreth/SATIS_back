const {dbconn} = require('../bd/index');

async function listarOrdenes(data, callback){
    try {
        let {idUser} = data;

        let sql = `SELECT * FROM orden_compra WHERE id_usuario = ${idUser};`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0][0]

        console.log(obj, 'holaaa');

        if (obj == undefined) {
            callback(null, 'NO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error login');
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
            callback(null, 'NO');
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
            callback(null, 'NO');
        } else {
            callback(null, obj);
        }
        
    } catch (error) {
        console.error(error, 'Error color');
        callback(error, null);
    }
}

module.exports = {
    listarOrdenes,
    listarProductos,
    listarCliente,
    listarColores
}
