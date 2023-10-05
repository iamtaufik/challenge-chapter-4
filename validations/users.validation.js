const joi = require('joi');

const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  identity_type: joi.string().required(),
  identity_number: joi.number().required(),
  address: joi.string().required(),
});

module.exports = {
  createUserSchema,
};
