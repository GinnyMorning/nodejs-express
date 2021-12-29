const logger = require('../config/logger');
const configs = require('../config/configs');

const app = require('./app');

const server = app.listen(configs.port, () => {
  logger.info(`App connected on port: ${configs.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn('Close server');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// eslint-disable-next-line no-unused-vars
const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    logger.warn('close server due to sig kill');
    server.close();
  }
});
