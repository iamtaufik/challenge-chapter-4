const joi = require('joi');

const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

module.exports = {
  createUserSchema,
};
