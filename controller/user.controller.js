const { generateToken } = require("../helper/auth.helper");
const authService = require("../services/auth.service");
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
const getUserFilter = (req, res) => {
  res.status(200).json(req.query);
};

const changeUserStatus = (req, res) => {
  const { id } = req.body;
  res.status(200).json(`Change User Status: ${id}`);
};

const updateUserById = (req, res) => {
  const { id } = req.body;
  res.status(200).json(`Update User Status: ${id}`);
};

module.exports = {
  getUserFilter,
  updateUserById,
  changeUserStatus,
  getUserDetails,
  getUserById,
};
