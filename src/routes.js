const { Router } = require('express');

const routes = new Router();

const QuestionController = require('./app/controllers/QuestionController');

const getQuestion = require('./app/middlewares/getQuestion');

routes.post('/questions', QuestionController.store);
routes.get('/questions', QuestionController.index);
routes.get('/questions/:question_id', getQuestion, QuestionController.show);

module.exports = routes;
