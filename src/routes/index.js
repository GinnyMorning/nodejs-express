const express = require('express');
const userRoute = require('./user');

const routes = express.Router();

routes.use('/user', userRoute);

module.exports = routes;
