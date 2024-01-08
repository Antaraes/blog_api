const role = require("../constants/role");
const { userStatus } = require("../constants/status");
const Joi = require("joi");
const User = require("../models/user.model");

const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})");

const SIGNUP_VALIDATE_SCHEMA = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(PASSWORD_REGEX).required(),
  confirm_password: Joi.ref("password"),
  email: Joi.string().email().required(),
  phone_number: Joi.string(),
  role: Joi.string().valid(role.admin, role.user).default(role.user).required(),
  description: Joi.string(),
});

const SIGNIN_VALIDATE_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const EXIST_USER = async (data) => {
  const user = await User.findOne({ data });
  return user ? true : false;
};

module.exports = { SIGNIN_VALIDATE_SCHEMA, SIGNUP_VALIDATE_SCHEMA, EXIST_USER };
