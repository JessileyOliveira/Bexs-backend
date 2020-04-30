const request = require('supertest');
const app = require('../../src/app');
const { generateFakeQuestion } = require('../utils/faker');
const Question = require('../../src/app/models/Question');

describe('Question tests', () => {
  afterEach(async () => {
    await Question.destroy({ truncate: { cascade: true } });
  });

  it('should add a new question and return status 201 (store)', async () => {
    const response = await request(app)
      .post('/questions')
      .send(generateFakeQuestion());
    expect(response.status).toBe(201);
  });
  it('should return status 400 in case of error (store)', async () => {
    const fakeQuestion = generateFakeQuestion();
    const response = await request(app)
      .post('/questions')
      .send({ text: fakeQuestion.text });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Error registering question');
  });
});
