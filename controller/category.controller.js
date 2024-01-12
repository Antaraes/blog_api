const { getDataFromAuthUser } = require("../helper/auth.helper");
const categoryService = require("../services/category.service");
const { retrieved, success } = require("./base.controller");

exports.getAllCategories = async (req, res, next) => {
  try {
    const data = await categoryService.getCategoryList();
    retrieved(res, "Categories", data);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await categoryService.createCategory(data);
    success(res, "Category created successfully", response);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    const user = await getDataFromAuthUser(req, res);
    const { userId } = user._id;
    const response = await categoryService.deleteCategory(categoryId, userId);
    success(res, "Delete category", response);
  } catch (error) {
    next(error);
  }
};
