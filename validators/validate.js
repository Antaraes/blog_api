const { SIGNIN_VALIDATE_SCHEMA, SIGNUP_VALIDATE_SCHEMA } = require("./user.validate");
const { userRouteConst, blogRouteConst } = require("../constants/routes");
const { BLOG_VALIDATE_SCHEMA } = require("./blog.validate");

module.exports = {
  [userRouteConst.signin]: SIGNIN_VALIDATE_SCHEMA,
  [userRouteConst.signup]: SIGNUP_VALIDATE_SCHEMA,
  [blogRouteConst.createBlog]: BLOG_VALIDATE_SCHEMA,
};
