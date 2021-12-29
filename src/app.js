const express = require('express');
const xss = require('xss-clean');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');

const routes = require('./routes');
const morgan = require('../config/morgan');
const configs = require('../config/configs');
const jwtStratergy = require('../config/passport');
const { authLimiter } = require('./middlewares/authLimiter');
const ApiError = require('../ultils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

// config middle ware for whole app

if (configs.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set sercurity HTTP header

app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable CORS
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStratergy);

// limit repeat failed requiest to auth endponts
if (configs.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle errror
app.use(errorHandler);

module.exports = app;
