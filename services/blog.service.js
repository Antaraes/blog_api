const role = require("../constants/role");
const { postStatus } = require("../constants/status");
const { itemNotFoundError, unauthorizedError, unprocessableError } = require("../errors/db.errors");
const { getDataFromAuthUser } = require("../helper/auth.helper");
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
  getAllBlogs: async (reqQuery, user) => {
    try {
      const { page = 1, pageSize = 4, sortBy = "createdAt", order = "desc", ...filters } = reqQuery;

      const filter = {};
      Object.entries(filters).forEach(([key, value]) => {
        filter[key] = value;
      });
      let sortCriteria = {};
      if (sortBy && order) {
        sortCriteria[sortBy] = order;
      }
      console.log("SortCriteria", sortCriteria);

      const blogs = await Blog.find(filter)
        .sort(sortCriteria)
        .skip((parseInt(page) - 1) * parseInt(pageSize))
        .limit(parseInt(pageSize))
        .populate(["created_by", "categories"]);

      const pendingTotalBlogs = await Blog.countDocuments({
        ...filter,
        status: postStatus.pending,
      });
      const rejectTotalBlogs = await Blog.countDocuments({
        ...filter,
        status: postStatus.rejected,
      });
      const approvedTotalBlogs = await Blog.countDocuments({
        ...filter,
        status: postStatus.approved,
      });
      const result = {
        data: blogs,
        total: await Blog.countDocuments(filter),
        pendingTotalBlogs,
        rejectTotalBlogs,
        approvedTotalBlogs,
      };
      return result;
    } catch (error) {
      console.log("error.message", error.message);
      throw unprocessableError(error);
    }
  },
  getBlogByUser: async (userId) => {
    try {
      const blog = await Blog.find({ created_by: userId }).populate({
        path: "created_by modified_by",
        model: "User",
        select: "username email role -_id",
      });

      if (blog == null) {
        itemNotFoundError("Blog not found");
      }
      return blog;
    } catch (error) {
      throw error;
    }
  },
  // Get a blog by ID
  getBlogById: async (blogId) => {
    try {
      const blog = await Blog.findById(blogId).populate([
        "created_by",
        "categories",
        "modified_by",
      ]);
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

      if (!(blog.created_by.equals(userId) || (user && user.role === "admin"))) {
        throw unauthorizedError("Permission denied. You are not the creator of this blog.");
      }

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });

      return updatedBlog;
    } catch (error) {
      throw unprocessableError(error);
    }
  },

  // Delete a blog by ID
  deleteBlogById: async (blogId, userId) => {
    try {
      // const blog = await checkId(blogId, Blog, "Blog Found");
      const blog = await Blog.findById(blogId);
      console.log(blog);
      if (!blog) {
        throw itemNotFoundError("Blog not found");
      }
      if (blog.created_by.toString() !== userId) {
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
