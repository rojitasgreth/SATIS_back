const {dbconn} = require('../bd/index');

async function login(data, callback){
    try {
        let {user, password} = data;

        let sql = `SELECT * FROM usuarios WHERE usuario = '${user}' AND clave = '${password}';`;
        let outSql = await dbconn.query(sql);

        console.log(outSql, 'holaaa');

        callback(null, 'ok');
    } catch (error) {
        console.error(error, 'Error login');
        callback(error, null);
    }
}
module.exports = {
    login
}
