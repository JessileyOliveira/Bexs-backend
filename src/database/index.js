const Sequelize = require('sequelize');

const Question = require('../app/models/Question');
const Answer = require('../app/models/Answer');
const Log = require('../app/models/Log');
const databaseConfig = require('../config/database');

const models = [Question, Answer, Log];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
