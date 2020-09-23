const express = require('express');
const routes = express.Router();

const ongsController = require('./controllers/ongsController');
const incidentsController = require('./controllers/incidentsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

routes.post('/sessions', sessionController.create);

routes.get('/ongs', ongsController.index)
  .post('/ongs', ongsController.create);

routes.post('/incidents', incidentsController.create)
  .get('/incidents', incidentsController.index)
  .delete('/incidents/:id', incidentsController.delete);

routes.get('/profile', profileController.index);

module.exports = routes;