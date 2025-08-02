const express = require('express');
const routes = express.Router();
const controller = require('../controllers/TransactionController');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

routes.get('/', controller.getTransaction);
routes.post('/', controller.create);
routes.put('/:id', controller.edit);
routes.patch('/:id/upload-image', upload.single('file'), controller.uploadImage);
routes.delete('/:id', controller.delete);

module.exports = routes;
