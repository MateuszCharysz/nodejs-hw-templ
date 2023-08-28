const Joi = require('joi');

const newUserToValidate = Joi.object({
  password: Joi.string().trim().max(35).required(),
  email: Joi.string().email().required(), //TODO HOW TO MAKE UNIQUE??
  subscription: Joi.string(),
});


const newUserJoiValidation = async (password, email, subscription) => {
  await newUserToValidate.validateAsync({
    password: password,
    email: email,
    subscription: subscription,
  });
};

module.exports = {
    newUserJoiValidation
}