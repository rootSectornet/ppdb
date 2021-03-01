'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class choices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  choices.init({
    choice: DataTypes.STRING,
    soal_id: DataTypes.INTEGER,
    isTrue: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'choices',
  });
  return choices;
};