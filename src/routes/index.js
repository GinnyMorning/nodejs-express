const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

const routes = express.Router();

routes.use('/auth', authRoute);
routes.use('/user', userRoute);

module.exports = routes;
