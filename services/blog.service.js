const Blog = require("../models/blog.model");

const blogService = {
  // Create a new blog
  createBlog: async (blogData) => {
    try {
      const newBlog = new Blog(blogData);
      const savedBlog = await newBlog.save();
      return savedBlog;
    } catch (error) {
      throw error;
    }
  },

  // Get all blogs with optional query parameters
  getAllBlogs: async (reqQuery) => {
    try {
      const { skip, limit, sortBy, order } = reqQuery;

      const filter = {};

      const blogs = await Blog.find(filter)
        .skip(parseInt(skip, 10) || 0)
        .limit(parseInt(limit, 10) || 10)
        .sort({ [sortBy]: order });

      return blogs;
    } catch (error) {
      throw error;
    }
  },

  // Get a blog by ID
  getBlogById: async (blogId) => {
    try {
      const blog = await Blog.findById(blogId);
      return blog;
    } catch (error) {
      throw error;
    }
  },

  // Update a blog by ID
  updateBlogById: async (blogId, updatedData) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });
      return updatedBlog;
    } catch (error) {
      throw error;
    }
  },

  // Delete a blog by ID
  deleteBlogById: async (blogId) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(blogId);
      return deletedBlog;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = blogService;
