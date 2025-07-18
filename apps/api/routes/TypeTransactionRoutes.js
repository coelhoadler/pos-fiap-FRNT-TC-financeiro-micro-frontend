const express = require('express');
const routes = express.Router();
const controller = require('../controllers/TypeTransactionController');

routes.get('/', controller.getTypeTransaction);

module.exports = routes;