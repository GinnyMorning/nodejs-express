const { Sequelize } = require('sequelize');
const configs = require('../../config/configs');
const logger = require('../../config/logger');

const sequelize = new Sequelize(configs.database);
try {
  sequelize.authenticate();
  logger.info('Connected to DB');
} catch (err) {
  logger.error(err);
}
module.exports = sequelize;
