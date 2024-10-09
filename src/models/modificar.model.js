const {dbconn} = require('../bd/index');

// Supervisor
async function modificarEmpleado(data, callback){

    const transaction = await dbconn.transaction();
    try {

        let sql = `UPDATE public.usuarios SET usuario = '${data.usuario}', clave = '${data.clave}', estatus = '${data.estatus}', rol = '${data.rol}' WHERE id = '${data.id}'`;

                let outsql = await dbconn.query (sql, {transaction});
                console.log(outsql);

                let sql2 = `UPDATE public.personal SET cedula = '${data.cedula}', primer_nombre = '${data.primer_nombre}', segundo_nombre = '${data.segundo_nombre}',
                                                       primer_apellido = '${data.primer_apellido}', segundo_apellido = '${data.segundo_apellido}', fecha_nacimiento = '${data.fecha_nacimiento}',
                                                       telefono = '${data.telefono}', correo = '${data.correo}' WHERE id_usuario = '${data.id}'`;
                let outsql2 = await dbconn.query (sql2, {transaction});
                console.log(outsql2);
                
                await transaction.commit()
                callback(null, 'Modificacion correcta');
            
        }catch (error) {
            transaction.rollback()
            console.error(error, 'Error de Modificacion');
            callback(error, null);
    }
}

module.exports = {
    modificarEmpleado
}
