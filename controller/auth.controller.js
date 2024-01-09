const { generateToken } = require("../helper/auth.helper");
const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const { success, error } = require("./base.controller");

const signup = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    success(res, "Register successfully", data);
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.setHeader("Authorization", data.accessToken);
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", data.accessToken, { httpOnly: true, sameSite: "None", secure: true });
    success(res, "login success", data);
  } catch (error) {
    next(error);
  }
};

const emailVerification = async (req, res, next) => {
  try {
    const { token } = req.params;
    const data = await authService.verification(token);
    success(res, "Verfied registration", data);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const data = await generateToken(token);
    success(res, "Token generated Successfully", data);
  } catch (error) {
    next(error);
  }
};
const logout = (req, res) => {
  res.status(200).json("Logout");
};

module.exports = {
  refreshToken,
  emailVerification,
  logout,
  signup,
  signin,
};
