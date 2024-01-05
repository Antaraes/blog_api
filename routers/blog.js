const { blogRouteConst } = require("../constants/routes");
const {
  getBlogById,
  updateBlogById,
  deleteBlogById,
  createBlog,
} = require("../controller/blog.controller");
const { schemaValidator } = require("../middleware/schemaValidator");

const router = require("express").Router();

router.get(blogRouteConst.initialBlog, getBlogById);
router.patch(blogRouteConst.initialBlog, updateBlogById);
router.delete(blogRouteConst.initialBlog, deleteBlogById);
router.post(blogRouteConst.createBlog, schemaValidator(blogRouteConst.createBlog), createBlog);

module.exports = router;
