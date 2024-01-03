const role = require("../constants/role");
const { userStatus } = require("../constants/status");
const Joi = require("joi");

const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})");

const Signup_validate_schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(PASSWORD_REGEX).required(),
  confirm_password: Joi.ref("password"),
  email: Joi.string().email().required(),
  phone_number: Joi.string(),
  role: Joi.string().valid(role.admin, role.user).default(role.user).required(),
  status: Joi.string()
    .valid(userStatus.active, userStatus.suspended)
    .default(userStatus.suspended)
    .required(),
  description: Joi.string(),
});

const Signin_validate_schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string(),
});

module.exports = { Signin_validate_schema, Signup_validate_schema };
