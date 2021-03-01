'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tryoutDetailsoalss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tryoutDetailsoalss.init({
    id_tryout_detail: DataTypes.INTEGER,
    id_soal: DataTypes.INTEGER,
    jawaban_user: DataTypes.STRING,
    jawaban_benar: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tryoutDetailsoalss',
  });
  return tryoutDetailsoalss;
};