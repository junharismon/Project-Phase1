'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8'))
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Profiles', data)
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
