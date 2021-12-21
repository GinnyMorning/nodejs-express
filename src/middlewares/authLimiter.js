import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 20,
  skipSuccessfulRequests: true,
});

module.exports = { authLimiter };
