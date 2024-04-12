const app = require('./app');
const {dbconn} = require('./bd');
const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../../.env")})


async function runServer() {
    try {

        await dbconn.authenticate();
        console.log('Conexion establecida con la base de datos');
        
        myserver = app.listen(process.env.PORT, function () {
            console.log(`Servidor iniciado en el puerto correspondiente ${process.env.PORT}`);
        })

    }catch (error) {
        console.error('No se establecio conexion con la base de datos: ', error);
    }
}

runServer();