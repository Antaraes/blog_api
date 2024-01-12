const role = require("../constants/role");
const { postStatus } = require("../constants/status");
const { itemNotFoundError, unauthorizedError, unprocessableError } = require("../errors/db.errors");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const { checkId } = require("./base.service");

const blogService = {
  // Create a new blog
  createBlog: async (blogData) => {
    try {
      const newBlog = new Blog(blogData);
      const savedBlog = await newBlog.save();
      return savedBlog;
    } catch (error) {
      throw unprocessableError(error);
    }
  },

  // Get all blogs with optional query parameters
  getAllBlogs: async (reqQuery) => {
    try {
      const { skip, limit, sortBy, order } = reqQuery;

      const filter = {
        status: "approved",
      };

      let sortCriteria = {};
      if (sortBy && order) {
        sortCriteria[sortBy] = order;
      }
      console.log("SortCriteria", sortCriteria);

      const blogs = await Blog.find(filter)
        .sort(sortCriteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit));

      return blogs;
    } catch (error) {
      console.log("error.message", error.message);
      throw unprocessableError(error);
    }
  },

  // Get a blog by ID
  getBlogById: async (blogId) => {
    try {
      const blog = await Blog.findById(blogId).populate({
        path: "created_by modified_by",
        model: "User",
        select: "username email role -_id",
      });
      await checkId(blogId, Blog, "Blog not found");
      if (blog == null) {
        itemNotFoundError("Blog not found");
      }
      return blog;
    } catch (error) {
      throw error;
    }
  },

  // Update a blog by ID
  updateBlogById: async (blogId, userId, updatedData) => {
    try {
      const blog = await Blog.findById(blogId);
      const user = await User.findById(userId);

      if (!blog) {
        throw itemNotFoundError("Blog not found");
      }

      if (blog.posted_by !== userId && user.role !== role.admin) {
        throw unauthorizedError("Permission denied. You are not the creator of this blog.");
      }
      console.log(updatedData);

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });
      return updatedBlog;
    } catch (error) {
      throw unprocessableError(error);
    }
  },

  // Delete a blog by ID
  deleteBlogById: async (blogId, userId) => {
    try {
      const blog = await Blog.findById(blogId);

      if (!blog) {
        throw itemNotFoundError("Blog not found");
      }
      if (blog.posted_by.toString() !== userId) {
        throw unauthorizedError("Permission denied. You are not the creator of this blog.");
      }
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      return deletedBlog;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = blogService;
