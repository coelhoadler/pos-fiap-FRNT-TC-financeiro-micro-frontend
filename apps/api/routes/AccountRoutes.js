const express = require('express');
const routes = express.Router();
const controller = require('../controllers/AccountController');

routes.get('/', controller.getAccount);
routes.post('/create', controller.create);

module.exports = routes;