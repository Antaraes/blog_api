const Joi = require("joi");

const BLOG_VALIDATE_SCHEMA = Joi.object({
  title: Joi.string().min(2).required(),
  content: Joi.string().required(),
  url_list: Joi.array()
    .items(
      Joi.object({
        link: Joi.string().required(),
        name: Joi.string().required(),
      })
    )
    .required(),
});

module.exports = { BLOG_VALIDATE_SCHEMA };
