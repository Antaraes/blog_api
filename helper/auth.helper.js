const { unprocessableError, invalidIDError, invalidError } = require("../errors/db.errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.getdataFromToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded === null) {
      throw invalidIDError("Invalid Link");
    }
    const user = decoded;
    return user;
  } catch (error) {
    throw unprocessableError(error.message);
  }
};

exports.generateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded === null) {
      throw invalidError("Invalid Token");
    }
    const accessToken = jwt.sign({ user: decoded }, process.env.JWT_SECRET, { expiresIn: "1m" });
    return accessToken;
  } catch (error) {}
};
