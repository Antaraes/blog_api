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
