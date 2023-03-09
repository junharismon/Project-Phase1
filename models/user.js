'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Job, { through: models.UserJob });
      User.hasOne(models.Profile)
      User.hasMany(models.UserJob)
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'username cannot be empty'},
        notNull : {msg : 'please insert your username'}
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'email cannot be empty'},
        notNull : {msg : 'please insert your email'},
        isEmail : {msg : 'wrong email format'}
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'password cannot be empty'},
        notNull : {msg : 'please insert your password'}
      }
    },
    role: DataTypes.STRING,
    hasProfile: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.role = 'user'
    user.password = hash
    user.hasProfile = false
  });
  return User;
};