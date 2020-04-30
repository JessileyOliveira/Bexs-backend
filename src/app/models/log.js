const { Model, DataTypes } = require('sequelize');

class Log extends Model {
  static init(sequelize) {
    super.init(
      {
        user: DataTypes.STRING,
        where: DataTypes.STRING,
        type: DataTypes.STRING(10),
        return: DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Log;
