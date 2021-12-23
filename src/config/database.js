const { Sequelize } = require('sequelize');
// const configs = require('./configs');

const sequelize = new Sequelize('mydb', 'postgres', 'mypostgres', {
  host: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;
