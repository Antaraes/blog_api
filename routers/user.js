const { userRouteConst } = require("../constants/routes");
const {
  getUserDetails,
  signup,
  signin,
  getUserById,
  logout,
  changeUserStatus,
  updateUserById,
  getUserFilter,
} = require("../controller/user.controller");
const { schemaValidator } = require("../middleware/schemaValidator");

const router = require("express").Router();

router.get(userRouteConst.getSelfDetails, getUserDetails);
router.get(userRouteConst.getUserFilter, getUserFilter);
router.post(userRouteConst.signup, schemaValidator(userRouteConst.signup), signup);
router.post(userRouteConst.signin, schemaValidator(userRouteConst.signin), signin);
router.get(userRouteConst.getUserById, getUserById);
router.post(userRouteConst.logout, logout);
router.patch(userRouteConst.updateUserStatus, changeUserStatus);
router.patch(userRouteConst.updateUserById, updateUserById);

module.exports = router;
