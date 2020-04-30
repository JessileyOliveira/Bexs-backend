const Question = require('../models/Question');
const { createLog } = require('../../utils/createLog');

class QuestionController {
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
        data.user,
        'Create Question',
        'Error',
        JSON.stringify(e.message)
      );
      return res
        .status(400)
        .json({ error: true, message: 'Error registering question' });
    }
  }
}

module.exports = new QuestionController();
