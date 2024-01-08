const jwt = require("jsonwebtoken");
const { unprocessableError, invalidError } = require("../errors/db.errors");
require("dotenv").config();

exports.verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw invalidError("JWT must be provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw unprocessableError(error.message);
  }
};
