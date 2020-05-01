const Question = require('../models/Question');
const { createLog } = require('../../utils/createLog');

class QuestionController {
  async index(req, res) {
    const { page = 1, perPage = 10 } = req.query;

    const questions = await Question.findAll({
      order: [['created_at', 'desc']],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const total = await Question.count({ col: 'id' });

    const content = {
      total,
      perPage: parseInt(perPage),
      lastPage: Math.ceil(total / perPage),
      page: parseInt(page),
      data: questions,
    };

    createLog('', 'Get Questions', 'Success', JSON.stringify(content));

    return res.status(200).json(content);
  }

  async store(req, res) {
    const data = req.body;

    try {
      const question = await Question.create(data);
      createLog(
        data.user,
        'Create Question',
        'Success',
        JSON.stringify(question)
      );

      return res.status(201).json(question);
    } catch (e) {
      createLog(
        data.user || '',
        'Create Question',
        'Error',
        JSON.stringify(e.message)
      );
      return res
        .status(400)
        .json({ error: true, message: 'Error registering question' });
    }
  }

  async show(req, res) {
    const question = req.question;

    return res.status(200).json(question);
  }
}

module.exports = new QuestionController();
