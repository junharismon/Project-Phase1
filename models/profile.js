'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    formatDate(date){
      const dateOld = new Date(date);
      const formattedDate = dateOld.toISOString().slice(0, 10);
      return formattedDate
    }
  }
  Profile.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'name cannot be empty'},
        notNull : {msg : 'please insert your name'}
      }
    },
    gender: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'gender cannot be empty'},
        notNull : {msg : 'please insert your gender'}
      }
    },
    age: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'age cannot be empty'},
        notNull : {msg : 'please insert your age'}
      }
    },
    phone: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'phone number cannot be empty'},
        notNull : {msg : 'please insert your phone number'}
      }
    },
    location: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {msg : 'location cannot be empty'},
        notNull : {msg : 'please insert your location'},
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};