const mongoose = require("mongoose");

exports.baseSchema = function (paths, options) {
  let schema = new mongoose.Schema(
    {
      created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      modified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  if (paths) {
    schema.add(paths);
  }
  if (options) {
    for (let key in options) {
      schema.set(key, options[key]);
    }
  }
  return schema;
};
