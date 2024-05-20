//Importación de liberías.
const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json());

// Aqui van la configuracion de rutas configuradas.
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/listados.routes'));
app.use(require('./routes/inserciones.routes'));
app.use(require('./routes/servicioCorreo.route'));
//Se exporta el modulo.
module.exports = app;