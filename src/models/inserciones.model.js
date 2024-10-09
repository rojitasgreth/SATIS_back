const {dbconn} = require('../bd/index');

const {
    EmailFormatUser,
    sendEmail
} = require("./servicioCorreo.model");

const {generateInvoicePDF} = require('./pdf.model');
const { info } = require('pdfkit');
 

// Vendedor
async function insertarCliente(data, callback){
    try {
        let {RIF, cliente, telefono, email, estado, calle, edificio} = data;
        console.log(data, 'dataaaa');

        let sql = `INSERT INTO public.clientes(rif, razon_social, telefono, correo, estado, calle, edificio)
        VALUES ('${RIF}', '${cliente}', '${telefono}', '${email}', '${estado}', '${calle}', ${edificio !== null ? `'${edificio}'` : 'null'}) RETURNING id;`;
        let outsql = await dbconn.query(sql);
        let idCliente = outsql[0][0].id;
        callback(null, idCliente);
        
        } catch (error) {
        console.error(error, 'Error de Insercion');
        callback(error, null);
    }
}

async function insertarOrden(data, callback){
    
    const transaction = await dbconn.transaction();

    try {
            let {email} = data.cliente;
            let sql = `INSERT INTO public.orden_compra(id_cliente, id_usuario, condiciones, tipo_envio, estatus_finalizado, estatus_correo) 
                        VALUES ('${data.cliente.id_cliente}', '${data.cliente.id_usuario}', '${data.cliente.condicion}', '${data.cliente.tipo_envio}', true , '${data.cliente.correo}') RETURNING id, fecha`;
                    let outsql = await dbconn.query (sql, {transaction});
                    let correoAlternativo = data.cliente.email
                    console.log(outsql);
                    let idSql = outsql[0][0].id;
                    let fechaSql = outsql[0][0].fecha;
                    console.log("LA FECHA ES: ",fechaSql);

                    data.cliente.id_orden = idSql;
                    data.cliente.fecha = fechaSql;


            for (let item of data.detalle){
                    let sql2 = `INSERT INTO public.detalle_orden(id_orden, cod_categoria, genero, cod_color, cantidad) 
                                    VALUES ('${idSql}', '${item.cod_categoria}', '${item.genero}', '${item.cod_color}', '${item.cantidad}')`;
                        let outsql2 = await dbconn.query (sql2, {transaction});
                        console.log(outsql2);
            }

            await generateInvoicePDF(data);

            if(data.cliente.correo == true) {
                try {

                    const attachments = [
                        {
                          filename: `compra-${data.cliente.nombre}-${data.cliente.id_orden}-${data.cliente.fecha}.pdf`,
                          path: `./PDFs/compra-${data.cliente.nombre}-${data.cliente.id_orden}-${data.cliente.fecha}.pdf` // Ruta al archivo adjunto
                        },
                    ];
                    
                        const html = EmailFormatUser();
                        console.log(attachments, 'si hayyy');
                    
                        await transaction.commit()
                        sendEmail(correoAlternativo, "Correo exitoso", html, attachments).then(info => {
                            console.log('soy feliz', info);                            
                        })
                        callback(null, 'Insercion correcta');

                }catch (error){
                    transaction.rollback()
                    console.error(error, 'Error de Insercion');
                    callback(error, null);
                    }
            
            }else{
                await transaction.commit()
                callback(null, 'Insercion correcta');
            }

        }catch (error) {
            transaction.rollback()
            console.error(error, 'Error de Insercion');
            callback(error, null);
            }


}


// Supervisor
async function insertarEmpleado(data, callback){

    const transaction = await dbconn.transaction();
    try {

        let sql = `INSERT INTO public.usuarios(usuario, clave, estatus, rol)
                        VALUES ('${data.usuario}', '${data.clave}', '${data.estatus}', '${data.rol}') RETURNING id`;

                let outsql = await dbconn.query (sql, {transaction});
                console.log(outsql);
                let idSql = outsql[0][0].id;

                let sql2 = `INSERT INTO public.personal(id_usuario, cedula, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, fecha_nacimiento, telefono, correo) 
                                VALUES ('${idSql}', '${data.cedula}', '${data.primer_nombre}', ${data.segundo_nombre !== null ? ` '${data.segundo_nombre}'` : 'null'}, '${data.primer_apellido}', ${data.segundo_apellido !== null ? `'${data.segundo_apellido}'` : 'null'}, '${data.fecha_nacimiento}', '${data.telefono}', '${data.correo}')`;
                let outsql2 = await dbconn.query (sql2, {transaction});
                console.log(outsql2);
                
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
    insertarOrden,

    insertarEmpleado
}
