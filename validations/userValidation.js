const joi = require("joi");

const validateSignUp = (object) => {
  const schema = joi.object().keys({
    firstname: joi
      .string()
      .required()
      .trim()
      .error(new Error("Please provide firstname")),
    lastname: joi
      .string()
      .required()
      .trim()
      .error(new Error("Please provide lastname")),
    email: joi
      .string()
      .required()
      .trim()
      .email({ tlds: { allow: false } })
      .error(new Error("Please provide valid email address")),
    password: joi
      .string()
      .required()
      .trim()
      .min(8)
      .error(
        new Error("please provide passowrd, with minimum of 8 characters"),
      ),
  });

  return schema.validate(object);
};

const validateLogin = (object) => {
  const schema = joi.object().keys({
    email: joi
      .string()
      .required()
      .trim()
      .email({ tlds: { allow: false } })
      .error(new Error("Please provide valid email address")),
    password: joi
      .string()
      .required()
      .trim()
      .min(8)
      .error(
        new Error("please provide passowrd, with minimum of 8 characters"),
      ),
  });

  return schema.validate(object)
};

module.exports = {
    validateSignUp,
    validateLogin
}
