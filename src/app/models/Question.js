const { Model, DataTypes } = require('sequelize');

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        user: DataTypes.STRING,
        text: DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Answer, {
      foreignKey: 'question_id',
      as: 'answers',
    });
  }
}

module.exports = Question;
