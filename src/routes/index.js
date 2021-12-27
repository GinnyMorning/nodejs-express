const express = require('express');
const userRoute = require('./User.route');
const authRoute = require('./Auth.route');

const routes = express.Router();

routes.use('/user', userRoute);
routes.use('/auth', authRoute);

module.exports = routes;
