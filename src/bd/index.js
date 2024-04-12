const { Sequelize } = require('sequelize');
const {resolve} = require('path')
require('dotenv').config({path: resolve(__dirname,"../../.env")})

const dbconn = new Sequelize(process.env.DB_DATABASE, process.env.DB_USUARIO, process.env.DB_CLAVE, {
  host: process.env.DB_HOST,
  dialect: 'postgresql'
})

module.exports = { dbconn };