exports.handler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log(err);
  if (err.message.match(/(unique|duplicate)/gi)) {
    return res.status(409).json({
      status: "fail",
      message: err.message,
      data: null,
    });
  }
  switch (err.name) {
    case "INVALID_ID":
    case "INVALID":
      res.status(400).json({
        status: "fail",
        message: err.message,
        data: null,
      });
      break;

    case "ITEM_NOT_FOUND":
      res.status(404).json({
        status: "fail",
        message: err.message,
        data: null,
      });
      break;
    case "MISSING_FILE":
      res.status(404).json({
        status: "fail",
        message: err.message,
        data: null,
      });
      break;
    case "UNAUTHORIZED":
      res.status(401).json({
        status: "fail",
        message: err.message,
        data: null,
      });
      break;
    case "ITEM_ALREADY_EXISTS":
      res.status(409).json({
        status: "fail",
        message: err.message,
        data: null,
      });
      break;
    default:
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        data: null,
      });
      break;
  }
};
