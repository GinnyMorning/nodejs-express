import logger from './config/logger';

const app = require('./app');

const server = app.listen(3000, () => {
  logger.warn('App connected on port 3000');
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn('Close server');
      process.exit(1);
    });
  }
};

// eslint-disable-next-line no-unused-vars
const unexpectedErrorHandler = (err) => {
  logger.warn('Exit!!');
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
