
const route = require('express').Router();
const IndexControl = require("../controllers/index.controller");

route.get('/', IndexControl.index);

route.get('/satis', IndexControl.index);

module.exports = route