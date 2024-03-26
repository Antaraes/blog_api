const { categoryRouteConst } = require("../constants/routes");
const {
  getAllCategories,
  deleteCategory,
  createCategory,
} = require("../controller/category.controller");
const { verifyAdmin } = require("../middleware/verifyUser");

const router = require("express").Router();

router
  .get(categoryRouteConst.initialRoute, getAllCategories)
  .post(categoryRouteConst.initialRoute, verifyAdmin, createCategory)
  .delete(categoryRouteConst.initialRoute, verifyAdmin, deleteCategory);

module.exports = router;
