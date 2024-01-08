const { userRouteConst } = require("../constants/routes");
const {
  getUserDetails,
  getUserById,
  changeUserStatus,
  updateUserById,
  getUserFilter,
} = require("../controller/user.controller");
const { schemaValidator } = require("../middleware/schemaValidator");
const { verifyUser } = require("../middleware/verifyUser");

const router = require("express").Router();

router.get(userRouteConst.getSelfDetails, verifyUser, getUserDetails);
router.get(userRouteConst.getUserFilter, getUserFilter);
router.get(userRouteConst.getUserById, getUserById);
router.patch(userRouteConst.updateUserStatus, changeUserStatus);
router.patch(userRouteConst.updateUserById, updateUserById);

module.exports = router;
