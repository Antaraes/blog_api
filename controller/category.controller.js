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
    const user = await getDataFromAuthUser(req, res);
    console.log(user);
    const newData = {
      ...data,
      created_by: user._id,
      modified_by: user._id,
    };

    const response = await categoryService.createCategory(newData);
    success(res, "Category created successfully", response);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.body;
    const user = await getDataFromAuthUser(req, res);

    const response = await categoryService.deleteCategory(categoryId, user);
    success(res, "Delete category", response);
  } catch (error) {
    next(error);
  }
};
