const {dbconn} = require('../bd/index');

async function insertarCliente(data, callback){
    try {
        let {rif, razon_social, telefono, correo, estado, calle, edificio} = data;

        let sql = `INSERT INTO public.clientes(rif, razon_social, telefono, correo, estado, calle, edificio)
                                        VALUES ('${rif}', '${razon_social}', '${telefono}', '${correo}', '${estado}', '${calle}', ${edificio !== undefined ? `'${edificio}'` : 'null'});`;

        let outSql = await dbconn.query(sql);


        callback(null, 'Insercion correcta');
    } catch (error) {
        console.error(error, 'Error de Insercion');
        callback(error, null);
    }
}


async function insertarOrden(data, callback){
    
    const transaction = await dbconn.transaction();

    try {
            let sql = `INSERT INTO public.orden_compra(id_cliente, id_usuario, condiciones, tipo_envio, estatus_finalizado, estatus_correo) 
                        VALUES ('${data.cliente.id_cliente}', '${data.cliente.id_usuario}', '${data.cliente.condicion}', '${data.cliente.tipo_envio}', true , false) RETURNING id`;
                    let outsql = await dbconn.query (sql, {transaction});
                    console.log(outsql);
                    let idSql = outsql[0][0].id;
    
            for (let item of data.detalle){
                    let sql2 = `INSERT INTO public.detalle_orden(id_orden, cod_categoria, genero, cod_color, cantidad) 
                                    VALUES ('${idSql}', '${item.cod_categoria}', '${item.genero}', '${item.cod_color}', '${item.cantidad}')`;
                        let outsql2 = await dbconn.query (sql2, {transaction});
                        console.log(outsql2);
            }

            await transaction.commit()
            callback(null, 'Insercion correcta');
            
            }catch (error) {

                transaction.rollback()
                console.error(error, 'Error de Insercion');
                callback(error, null);
        }
}

module.exports = {
    insertarCliente,
    insertarOrden
}
