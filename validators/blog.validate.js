const Joi = require("joi");

const BLOG_VALIDATE_SCHEMA = Joi.object({
  title: Joi.string().min(2),
  content: Joi.string(),
});

module.exports = { BLOG_VALIDATE_SCHEMA };
