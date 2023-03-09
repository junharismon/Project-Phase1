'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.User, { through: models.UserJob });
      Job.hasMany(models.UserJob)
    }
  }

    

  Job.init({
    title: DataTypes.STRING,
    vacancy: DataTypes.INTEGER,
    category: DataTypes.STRING,
    companyName: DataTypes.STRING,
    location: DataTypes.STRING,
    requirement: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};