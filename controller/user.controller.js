const { userStatus } = require("../constants/status");
const { unprocessableError, itemNotFoundError } = require("../errors/db.errors");
const { generateToken, getDataFromAuthUser } = require("../helper/auth.helper");
const User = require("../models/user.model");
const authService = require("../services/auth.service");
const { checkId } = require("../services/base.service");
const userService = require("../services/user.service");
const { success, error } = require("./base.controller");

const getUserDetails = (req, res) => {
  success(res, "User details", req.user);
};

const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await userService.getUserById(id);
    success(res, "User Found", data);
  } catch (err) {
    error(res, err.message);
  }
};
const getUserFilter = async (req, res) => {
  try {
    const data = await userService.getAllUsers(req.query);
    success(res, "User Filter", data);
  } catch (err) {
    error(res, err.message);
  }
};

const changeUserStatus = async (req, res, next) => {
  try {
    const { id } = req.body;
    console.log(id);

    const user = await User.findById(id);

    if (!user) {
      throw itemNotFoundError("User not found");
    }
    const newStatus = user.status === userStatus.active ? userStatus.suspended : userStatus.active;
    const updatedUser = await userService.updateUserById(id, { status: newStatus });

    success(res, "User status updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await getDataFromAuthUser(req, res);
    const id = user._id;
    const { username, email, phone_number, description } = req.body;
    const updatedUser = await userService.updateUserById(id, {
      username,
      email,
      phone_number,
      description,
    });
    success(res, "Updated user", updatedUser);
  } catch (error) {
    throw unprocessableError(error);
  }
};

const deleteUserByhimSelf = async (req, res, next) => {
  try {
    const user = await getDataFromAuthUser(req, res);
    const userId = user._id;
    const data = await userService.updateUserById(userId, { status: userStatus.deleted });
    success(res, "Successfully deleted user", data);
  } catch (error) {
    throw unprocessableError(error);
  }
};
const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const data = await userService.deleteUserById(userId);
    success(res, "Successfully deleted user", data);
  } catch (error) {
    throw unprocessableError(error);
  }
};
module.exports = {
  getUserFilter,
  deleteUserById,
  deleteUserByhimSelf,
  updateUserById,
  changeUserStatus,
  getUserDetails,
  getUserById,
};
