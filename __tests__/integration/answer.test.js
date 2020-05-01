const request = require('supertest');
const app = require('../../src/app');
const { generateFakeQuestion, generateFakeAnswer } = require('../utils/faker');
const Question = require('../../src/app/models/Question');
const Log = require('../../src/app/models/Log');

describe('Answers tests', () => {
  beforeAll(async () => {
    await Question.destroy({ truncate: { cascade: true } });
    await Log.destroy({ truncate: { cascade: true } });
  });

  it('should be able add a Answer (store)', async () => {
    const question = await Question.create(generateFakeQuestion());
    const response = await request(app)
      .post(`/questions/${question.id}/answers`)
      .send(generateFakeAnswer());

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
  it('should return error when question_id is invalid (store)', async () => {
    const question = await Question.create(generateFakeQuestion());
    await question.destroy();
    const response = await request(app)
      .post(`/questions/${question.id}/answers`)
      .send(generateFakeAnswer());

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Question not found!');
  });

  it('should return status 400 in case of invalid answer (store)', async () => {
    const question = await Question.create(generateFakeQuestion());
    const fakeAnswer = generateFakeAnswer();
    const response = await request(app)
      .post(`/questions/${question.id}/answers`)
      .send({ text: fakeAnswer.text });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Error registering answer');
  });
});
