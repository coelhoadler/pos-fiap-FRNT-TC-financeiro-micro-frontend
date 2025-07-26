const express = require('express');
const routes = express.Router();
const controller = require('../controllers/AccountController');

routes.get('/', controller.getAccount);
routes.post('/create', controller.create);
routes.get('/getAccountById/:accountNumber', controller.getAccountById);

module.exports = routes;