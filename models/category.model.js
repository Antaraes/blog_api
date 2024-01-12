const mongoose = require("mongoose");
const base = require("./base.model");
const categorySchema = new base.baseSchema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
