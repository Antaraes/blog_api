const { userRouteConst } = require("../constants/routes");
const {
  getUserDetails,
  getUserById,
  changeUserStatus,
  updateUserById,
  getUserFilter,
  deleteUserById,
  deleteUserByhimSelf,
} = require("../controller/user.controller");
const { schemaValidator } = require("../middleware/schemaValidator");
const { verifyUser, verifyAdmin } = require("../middleware/verifyUser");

const router = require("express").Router();

router.get(userRouteConst.getSelfDetails, verifyUser, getUserDetails);
router.get(userRouteConst.getUserFilter, verifyAdmin, getUserFilter);
router.get(userRouteConst.getUserById, getUserById);
router.patch(userRouteConst.updateUserStatus, verifyAdmin, changeUserStatus);
router.patch(userRouteConst.updateUserById, updateUserById);
router.delete(userRouteConst.deleteUser, deleteUserByhimSelf);
router.delete(userRouteConst.deleteUserById, verifyAdmin, deleteUserById);

module.exports = router;
