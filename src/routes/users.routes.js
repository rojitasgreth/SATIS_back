const express = require('express');
const route = express.Router();
const url = require("../url.json");
const controller = require('../controllers/users.controller');

route.post(url.users.login, controller.login);

module.exports = route;