const blogService = require("../services/blog.service");
const { error, success } = require("./base.controller");

const getBlogById = async (req, res, next) => {
  try {
    const data = await blogService.getBlogById(req.body);
    success(res, "Blog Filter", data);
  } catch (err) {
    error(res, err.message);
    next(err);
  }
};
const createBlog = (req, res, next) => {
  const data = req.body;
  res.json(data);
};

const updateBlogById = (req, res, next) => {
  const { id } = req.body;
  res.json({ message: `Updated ${id}` });
};

const deleteBlogById = (req, res, next) => {
  const { id } = req.body;
  res.json({ message: `Deleted ${id}` });
};

module.exports = {
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
