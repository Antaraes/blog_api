const jwt = require("jsonwebtoken");
const { unprocessableError, invalidError, unauthorizedError } = require("../errors/db.errors");
const role = require("../constants/role");
require("dotenv").config();

exports.verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.cookies.accessToken;
    console.log(token);

    if (!token) {
      throw invalidError("JWT must be provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    next();
  } catch (error) {
    throw unprocessableError(error.message);
  }
};

exports.verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.cookies.accessToken;
    console.log(token);
    if (!token) {
      throw invalidError("JWT must be provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded.user || decoded.user.role !== role.admin) {
      throw unauthorizedError("Admin privileges required");
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    throw unprocessableError(error.message);
  }
};
