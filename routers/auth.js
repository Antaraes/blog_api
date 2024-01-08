const { authRouteConst } = require("../constants/routes");
const {
  signin,
  signup,
  emailVerification,
  refreshToken,
  logout,
} = require("../controller/auth.controller");
const { schemaValidator } = require("../middleware/schemaValidator");

const router = require("express").Router();

router.post(authRouteConst.signup, schemaValidator(authRouteConst.signup), signup);
router.post(authRouteConst.signin, schemaValidator(authRouteConst.signin), signin);
router.post(authRouteConst.verification, emailVerification);
router.post(authRouteConst.getRefreshToken, refreshToken);
router.post(authRouteConst.logout, logout);

module.exports = router;
