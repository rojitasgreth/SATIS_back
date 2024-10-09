const {dbconn} = require('../bd/index');

// Supervisor
async function eliminarEmpleado(data, callback){

    const transaction = await dbconn.transaction();
    try {

        let sql =  `DELETE FROM public.personal WHERE id_usuario = '${data.id}'`;

                let outsql = await dbconn.query (sql, {transaction});
                console.log(outsql);

        let sql2 =   `DELETE FROM public.usuarios WHERE id = '${data.id}'`;

                let outsql2 = await dbconn.query (sql2, {transaction});
                console.log(outsql2);
                
            await transaction.commit()
            callback(null, 'Eliminacion exitosa');
            
        }catch (error) {
            transaction.rollback()
            console.error(error, 'Eliminacion fallida');
            callback(error, null);
    }
}

module.exports = {
    eliminarEmpleado
}
