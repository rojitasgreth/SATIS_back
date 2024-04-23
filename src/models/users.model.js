const {dbconn} = require('../bd/index');

async function login(data, callback){
    try {
        let {usuario, clave} = data;

        let sql = `SELECT * FROM usuarios WHERE usuario = '${usuario}';`;
        let outSql = await dbconn.query(sql);
        let obj = outSql[0][0];
        let out;
        console.log(obj, 'holaaa');

        if (obj == undefined) {
            out = 'No existe el usuario.';
        } else {
            if (obj.clave == `${clave}` && obj.estatus == 'Activo'){
                out = obj;
            }else if (obj.clave !== `${clave}`) {
                out = 'Credenciales incorrectas.';
            } else if (obj.estatus == 'Inactivo') {
                out = 'Usuario inactivo.'
            }
        }

        callback(null, out);
    } catch (error) {
        console.error(error, 'Error login');
        callback(error, null);
    }
}
module.exports = {
    login
}
