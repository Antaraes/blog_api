const User = require("../models/user.model");

const userService = {
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async (reqQuery) => {
    try {
      const { skip, limit, sortBy, order, ...filters } = reqQuery;

      const filter = {};

      Object.entries(filters).forEach(([key, value]) => {
        filter[key] = value;
      });

      const users = await User.find(filter)
        .skip(parseInt(skip, 10) || 0)
        .limit(parseInt(limit, 10) || 10)
        .sort({ [sortBy]: order });
      const activeTotalUsers = await User.countDocuments({ ...filter, status: "active" });
      const suspendedTotalUsers = await User.countDocuments({ ...filter, status: "suspended" });
      const totalUsers = await User.countDocuments(users);

      return { users, totalUsers, activeTotalUsers, suspendedTotalUsers };
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUserById: async (userId, updatedData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  // Delete a user by ID
  deleteUserById: async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = userService;
