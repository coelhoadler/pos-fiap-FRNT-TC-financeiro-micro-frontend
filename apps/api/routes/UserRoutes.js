const express = require('express');
const routes = express.Router();
const controller = require('../controllers/UserController');
const authenticateToken = require('../middleware/autenticateToken');

routes.post('/auth', controller.auth);
routes.post('/create', controller.create);
routes.get('/info', authenticateToken, controller.info);
routes.post('/logout', authenticateToken, controller.logout);

module.exports = routes;