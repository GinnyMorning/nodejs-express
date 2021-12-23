const express = require('express');
const userRoute = require('./user');
const authRoute = require('./auth');

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/auth', authRoute);

module.exports = routes;
