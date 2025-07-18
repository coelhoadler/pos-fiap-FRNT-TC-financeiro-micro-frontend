const express = require('express');
const routes = express.Router();
const controller = require('../controllers/AccountTypeController');

routes.get('/', controller.getAccountType);

module.exports = routes;