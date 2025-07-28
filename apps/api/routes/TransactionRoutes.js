const express = require('express');
const routes = express.Router();
const controller = require('../controllers/TransactionController');

routes.get('/', controller.getTransaction);
routes.post('/', controller.create);
routes.put('/:id', controller.edit);
routes.delete('/:id', controller.delete);

module.exports = routes;
