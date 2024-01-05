const { SIGNIN_VALIDATE_SCHEMA, SIGNUP_VALIDATE_SCHEMA } = require("./user.validate");
const { userRouteConst } = require("../constants/routes");

module.exports = {
  [userRouteConst.signin]: SIGNIN_VALIDATE_SCHEMA,
  [userRouteConst.signup]: SIGNUP_VALIDATE_SCHEMA,
};
