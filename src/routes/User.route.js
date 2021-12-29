const express = require('express');
const db = require('../data/config/database');
const logger = require('../config/logger');

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello world from user');
});
router.get('/test', async (req, res) => {
  try {
    await db.authenticate();
    logger.info('Connection has been established successfully.');
    res.send('OK');
  } catch (err) {
    logger.error('Unable to connect to the database:', err);
  }
});
module.exports = router;
