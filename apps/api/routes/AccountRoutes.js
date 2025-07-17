const express = require('express');
const routes = express.Router();
const controller = require('../controllers/AccountController');

routes.get('/', controller.getAccount);

module.exports = routes;