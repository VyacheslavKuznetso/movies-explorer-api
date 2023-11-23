const { Joi } = require('celebrate');

const createUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const loginUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const userIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
};

const userMeValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  createUserValidation,
  loginUserValidation,
  userIdValidation,
  userMeValidation,
};
