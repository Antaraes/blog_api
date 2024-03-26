const { SIGNIN_VALIDATE_SCHEMA, SIGNUP_VALIDATE_SCHEMA } = require("./user.validate");
const { userRouteConst, blogRouteConst, authRouteConst } = require("../constants/routes");
const { BLOG_VALIDATE_SCHEMA } = require("./blog.validate");

module.exports = {
  [authRouteConst.signin]: SIGNIN_VALIDATE_SCHEMA,
  [authRouteConst.signup]: SIGNUP_VALIDATE_SCHEMA,
  [blogRouteConst.createBlog]: BLOG_VALIDATE_SCHEMA,
};
