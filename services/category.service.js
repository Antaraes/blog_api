const role = require("../constants/role");
const { unprocessableError, unauthorizedError } = require("../errors/db.errors");
const Category = require("../models/category.model");
const User = require("../models/user.model");
const { checkId } = require("./base.service");

const categoryService = {
  createCategory: async (data) => {
    try {
      const newCategory = new Category(data);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      throw unprocessableError(error);
    }
  },
  getCategoryList: async () => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw unprocessableError(error);
    }
  },
  deleteCategory: async (id, userId) => {
    try {
      const user = await User.findById(userId);
      await checkId(id, Category, "Category not found");
      if (user.role !== role.admin) {
        throw unauthorizedError("Permission denied");
      }
      const deletedCategory = await Category.findByIdAndDelete(id);
      return deletedCategory;
    } catch (error) {
      throw unprocessableError(error);
    }
  },
};

module.exports = categoryService;
