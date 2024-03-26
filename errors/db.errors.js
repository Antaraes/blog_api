exports.invalidIDError = (key) => {
  let err = new Error(key);
  err.name = "INVALID_ID";
  return err;
};

exports.invalidError = (key) => {
  let err = new Error(key);
  err.name = "INVALID";
  return err;
};

exports.itemNotFoundError = (name) => {
  let err = new Error(name);
  err.name = "ITEM_NOT_FOUND";
  return err;
};

exports.alreadyExistsError = (name) => {
  let err = new Error(name);
  err.name = "ITEM_ALREADY_EXISTS";
  return err;
};
exports.unauthorizedError = (name) => {
  let err = new Error(name);
  err.name = "UNAUTHORIZED";
  return err;
};
exports.unprocessableError = (name) => {
  let err = new Error(name);
  err.name = "UNPROCESSABLE";
  return err;
};
