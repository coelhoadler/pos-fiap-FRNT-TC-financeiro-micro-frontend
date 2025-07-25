const express = require('express');
const routes = express.Router();
const controller = require('../controllers/UserController');

routes.post('/auth', controller.auth);
routes.post('/create', controller.create);
routes.get('/info', controller.info);
routes.post('/logout', controller.logout);

module.exports = routes;