const { postStatus } = require("../constants/status");
const {
  unprocessableError,
  itemNotFoundError,
  invalidError,
  unauthorizedError,
} = require("../errors/db.errors");
const { getDataFromAuthUser } = require("../helper/auth.helper");
const blogService = require("../services/blog.service");
const { error, success } = require("./base.controller");

const getBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const data = await blogService.getBlogById(blogId);
    console.log(data);
    success(res, "Blog Filter", data);
  } catch (err) {
    next(err);
  }
};

const getBlogByFilter = async (req, res, next) => {
  try {
    const data = await blogService.getAllBlogs(req.query);
    console.log(data);
    success(res, "Blog Filter", data);
  } catch (error) {
    next(error);
  }
};
const createBlog = async (req, res, next) => {
  try {
    const data = req.body;
    const { _id } = await getDataFromAuthUser(req, res);
    if (!_id) {
      unauthorizedError("User not logged in");
    }
    const fileDetailsArray = req.files.map((file) => ({
      link: file.path,
      name: file.originalname,
      type: file.mimetype,
    }));
    const blog = {
      ...data,
      created_by: _id,
      url_list: fileDetailsArray,
    };
    const createdBlog = await blogService.createBlog(blog);
    success(res, "Created Blog Successfully", createdBlog);
  } catch (err) {
    error(res, err.message);
  }
};

const updateBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const data = req.body;
    const { _id: userId } = await getDataFromAuthUser(req, res);
    if (!userId) {
      unauthorizedError("User not logged in");
    }
    const updateBlog = {
      ...data,
      modified_by: userId,
    };
    const updatedBlog = await blogService.updateBlogById(blogId, userId, updateBlog);
    success(res, "updated blog", updatedBlog);
  } catch (error) {
    next(error);
  }
};

const deleteBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const { _id: userId } = await getDataFromAuthUser(req, res);
    const deletedBlog = await blogService.deleteBlogById(blogId, userId);
    success(res, "Deleted blog", deletedBlog);
  } catch (error) {
    next(error);
  }
};

const changeBlogStatus = async (req, res, next) => {
  try {
    const { blogId, status } = req.body;
    const { _id: userId } = await getDataFromAuthUser(req, res);
    const blog = await blogService.getBlogById(blogId);

    const changeStatusBlog = {
      ...blog.toObject(),
      modified_by: userId,
      status: status,
    };
    const updatedBlog = await blogService.updateBlogById(blogId, userId, changeStatusBlog);
    success(res, `Updated status for blog with ID: ${blog.title}`, updatedBlog);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getBlogById,
  createBlog,
  getBlogByFilter,
  changeBlogStatus,
  updateBlogById,
  deleteBlogById,
};
