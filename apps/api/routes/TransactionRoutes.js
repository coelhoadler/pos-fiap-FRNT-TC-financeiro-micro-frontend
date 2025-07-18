const express = require('express');
const routes = express.Router();
const controller = require('../controllers/TransactionController');

routes.get('/', controller.getTransaction);
routes.post('/create', controller.create);
routes.put('/edit/:id', controller.edit);
routes.delete('/delete/:id', controller.delete);

module.exports = routes;