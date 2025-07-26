const express = require('express');
const routes = express.Router();
const controller = require('../controllers/AccountController');

routes.get('/', controller.getAccount);
routes.post('/', controller.create);
routes.get('/getAccountById/:accountNumber', controller.getAccountById);
routes.put('/', controller.updateGetAccount);

module.exports = routes;
