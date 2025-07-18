const express = require('express');
const routes = express.Router();
const controller = require('../controllers/ProfileController');

routes.get('/', controller.getProfile);

module.exports = routes;