const { Model, DataTypes } = require('sequelize');

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        user: DataTypes.STRING,
        text: DataTypes.TEXT,
        question_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: 'question_id',
      as: 'question',
    });
  }
}

module.exports = Question;
