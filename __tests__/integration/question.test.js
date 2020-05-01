const request = require('supertest');
const app = require('../../src/app');
const { generateFakeQuestion } = require('../utils/faker');
const Question = require('../../src/app/models/Question');
const Log = require('../../src/app/models/Log');

describe('Question tests', () => {
  afterAll(async () => {
    await Question.destroy({ truncate: { cascade: true } });
    await Log.destroy({ truncate: { cascade: true } });
  });

  it('should add a new question and return status 201 (store)', async () => {
    const response = await request(app)
      .post('/questions')
      .send(generateFakeQuestion());
    expect(response.status).toBe(201);
  });
  it('should return status 400 in case of invalid question (store)', async () => {
    const fakeQuestion = generateFakeQuestion();
    const response = await request(app)
      .post('/questions')
      .send({ text: fakeQuestion.text });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Error registering question');
  });

  it('should return a list of questions (index)', async () => {
    const response = await request(app).get(`/questions`).send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('page');
    expect(response.body).toHaveProperty('perPage');
    expect(response.body).toHaveProperty('lastPage');
    expect(response.body).toHaveProperty('total');
  });
  it('should return page 1 in case of not sended page query (index)', async () => {
    const response = await request(app).get(`/questions`).send();
    expect(response.status).toBe(200);
    expect(response.body.page).toBe(1);
  });
  it('should return perPage 10 in case of not sended perPage query (index)', async () => {
    const response = await request(app).get(`/questions`).send();
    expect(response.status).toBe(200);
    expect(response.body.perPage).toBe(10);
  });
  it('should be able return differents pages (index)', async () => {
    const response = await request(app).get(`/questions?page=2`).send();
    expect(response.status).toBe(200);
    expect(parseInt(response.body.page)).toBe(2);
  });
  it('should be able return differents perPages (index)', async () => {
    const response = await request(app).get(`/questions?perPage=5`).send();
    expect(response.status).toBe(200);
    expect(parseInt(response.body.perPage)).toBe(5);
  });

  it('should return a question (show)', async () => {
    const fakeQuestion = generateFakeQuestion();
    const question = await Question.create(fakeQuestion);
    const response = await request(app).get(`/questions/${question.id}`).send();
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('answers');
  });
  it('should return status 404 when question not Exists (show)', async () => {
    const fakeQuestion = generateFakeQuestion();
    const question = await Question.create(fakeQuestion);

    await question.destroy();
    const response = await request(app).get(`/questions/${question.id}`).send();
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Question not found!');
  });
});
