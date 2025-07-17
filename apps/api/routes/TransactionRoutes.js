const express = require('express');
const routes = express.Router();
const controller = require('../controllers/TransactionController');

routes.get('/', controller.getTransaction);
routes.post('/create', controller.transacion);

module.exports = routes;