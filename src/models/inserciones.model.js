const {dbconn} = require('../bd/index');

async function insertarCliente(data, callback){
    try {
        let {rif, razon_social, telefono, correo, estado, calle, edificio} = data;

        let sql = `INSERT INTO public.clientes(rif, razon_social, telefono, correo, estado, calle, edificio)
                                        VALUES ('${rif}', '${razon_social}', '${telefono}', '${correo}', '${estado}', '${calle}', ${edificio !== undefined ? `'{${rolInsert}}'` : 'null'});`;

        let outSql = await dbconn.query(sql);


        callback(null, 'Insercion correcta');
    } catch (error) {
        console.error(error, 'Error de Insercion');
        callback(error, null);
    }
}
module.exports = {
    insertarCliente
}
