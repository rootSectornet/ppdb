'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  admissions.init({
    ajaran: DataTypes.STRING,
    kuota: DataTypes.INTEGER,
    minimum: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admissions',
  });
  return admissions;
};