const { Router } = require('express');

const routes = new Router();

const QuestionController = require('./app/controllers/QuestionController');
const AnswerController = require('./app/controllers/AnswerController');

const getQuestion = require('./app/middlewares/getQuestion');

routes.post('/questions', QuestionController.store);
routes.get('/questions', QuestionController.index);
routes.get('/questions/:question_id', getQuestion, QuestionController.show);

routes.post(
  '/questions/:question_id/answers',
  getQuestion,
  AnswerController.store
);

module.exports = routes;
