const Sequelize = require('sequelize');

const sequelize = new Sequelize('cakhiabynode', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;