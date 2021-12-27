const { Sequelize } = require('sequelize');
const configs = require('./configs');

const sequelize = new Sequelize(configs.database);

module.exports = sequelize;
