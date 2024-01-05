const User = require("../models/user.model");

const userService = {
  // Create a new user
  createUser: async (userData) => {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  },

  // Retrieve all users
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  },

  // Retrieve a user by ID
  getUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Update a user by ID
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
