const Question = require('../models/Question');
const { createLog } = require('../../utils/createLog');

module.exports = async (req, res, next) => {
  const { question_id } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  const question = await Question.findByPk(question_id, {
    include: [
      {
        association: 'answers',
        order: [['created_at', 'desc']],
        limit: perPage,
        offset: (page - 1) * perPage,
      },
    ],
  });

  if (!question) {
    createLog('', 'Get Question by id', 'Error', 'Question not found!');
    return res
      .status(404)
      .json({ error: true, message: 'Question not found!' });
  }

  req.question = question;

  next();
};
