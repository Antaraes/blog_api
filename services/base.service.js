const mongoose = require("mongoose");
const { invalidIDError } = require("../errors/db.errors");
exports.checkId = async (id, Model, key) => {
  await this.checkValidObjectId(id, key);
  const document = await Model.findById(id);
  if (!document) {
    throw invalidIDError(key);
  }
};

exports.checkValidObjectId = async (id, key) => {
  if (!mongoose.isValidObjectId(id)) {
    throw invalidIDError(key);
  }
};
