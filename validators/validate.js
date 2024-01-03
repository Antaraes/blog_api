const { Signin_validate_schema, Signup_validate_schema } = require("./user.validate");

module.exports = {
  "/auth/signin": Signin_validate_schema,
  "/auth/signup": Signup_validate_schema,
};
