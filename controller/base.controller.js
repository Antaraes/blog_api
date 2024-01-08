const { itemNotFoundError } = require("../errors/db.errors");

exports.success = (res, message, data) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

exports.error = (res, message, data = null) => {
  return res.status(500).json({
    status: "error",
    message,
    data,
  });
};

exports.response = (res, status = 200, message, data = null) => {
  return res.status(status).json({
    status: "success",
    message,
    data,
  });
};

exports.retrieved = (res, name, data = null) => {
  if (!data) {
    throw itemNotFoundError(name);
  }

  return success(res, name, data);
};

exports.authFail = (res) => {
  res.status(401).json({
    message: "Auth Fail",
  });
};
