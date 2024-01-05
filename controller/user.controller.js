const userService = require("../services/user.service");
const { success, error } = require("./base.controller");

const getUserDetails = (req, res) => {
  res.status(200).json("Hello I'm a user");
};

const signup = (req, res) => {
  const data = userService.createUser(req.body);
  res.status(200).json(data);
};

const signin = (req, res) => {
  res.status(200).json(req.body);
};

const logout = (req, res) => {
  res.status(200).json("Logout");
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
  logout,
  signup,
  getUserById,
  signin,
};
