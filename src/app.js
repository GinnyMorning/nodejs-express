import express from 'express';
import xss from 'xss-clean';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';

import httpStatus from 'http-status';
import routes from './routes';
import morgan from './config/morgan';
import configs from './config/configs';
import jwtStratergy from './config/passport';
import authLimiter from './middlewares/authLimiter';
import ApiError from './ultils/ApiError';
import errorConverter from './middlewares/error';

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
app.use('jwt', jwtStratergy);

// limit repeat failed requiest to auth endponts
if (configs.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

module.exports = app;
