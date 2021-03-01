'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  soals.init({
    soal: DataTypes.STRING,
    jawaban: DataTypes.STRING,
    matpel_id: DataTypes.INTEGER,
    pembahasan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'soals',
  });
  return soals;
};