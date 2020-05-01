const { createLog } = require('../../utils/createLog');
const Answer = require('../models/Answer');

class AnswerController {
  async store(req, res) {
    const { user, text } = req.body;
    const question = req.question;

    try {
      const answer = await Answer.create({
        user,
        text,
        question_id: question.id,
      });
      createLog(user, 'Create Answer', 'Success', JSON.stringify(answer));

      return res.status(201).json(answer);
    } catch (e) {
      createLog(
        user || '',
        'Create Answer',
        'Error',
        JSON.stringify(e.message)
      );
      return res
        .status(400)
        .json({ error: true, message: 'Error registering answer' });
    }
  }
}

module.exports = new AnswerController();
