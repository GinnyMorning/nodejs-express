const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../../ultils/pick');
const ApiError = require('../../ultils/ApiError');

const validate = (schema) => (req, res, next) => {
  const validateSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validateSchema));
  const { value, error } = Joi.compile(validateSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
module.exports = validate;
