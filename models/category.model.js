const mongoose = require("mongoose");

const { baseSchema } = require("./base.model");
const categorySchema = new baseSchema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
