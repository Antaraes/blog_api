const mongoose = require("mongoose");
const { postStatus } = require("../constants/status");
const { baseSchema } = require("./base.model");

const blogSchema = new baseSchema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  url_list: {
    type: [
      {
        link: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  status: {
    type: String,
    default: postStatus.pending,
    enum: [postStatus.pending, postStatus.approved, postStatus.rejected],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
