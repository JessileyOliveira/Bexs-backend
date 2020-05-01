const { Router } = require('express');

const routes = new Router();

const QuestionController = require('./app/controllers/QuestionController');

routes.post('/questions', QuestionController.store);
routes.get('/questions', QuestionController.index);

module.exports = routes;
