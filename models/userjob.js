'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserJob.belongsTo(models.Job)
      UserJob.belongsTo(models.User)
    }

    static findUserId(userId){
      return UserJob.findAll({
        where: {
            UserId: userId
        }
    })
    }
  }
  UserJob.init({
    JobId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserJob',
  });
  return UserJob;
};