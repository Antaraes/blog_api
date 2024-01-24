const upload = require("../config/imageStorage");
const { blogRouteConst } = require("../constants/routes");
const {
  getBlogById,
  updateBlogById,
  deleteBlogById,
  createBlog,
  getAllBlogs,
  changeBlogStatus,
  getBlogByFilter,
  getBlogByUser,
} = require("../controller/blog.controller");
const { schemaValidator } = require("../middleware/schemaValidator");
const { verifyAdmin, verifyUser } = require("../middleware/verifyUser");

const router = require("express").Router();

router.get(blogRouteConst.initialBlog, getBlogById);
router.patch(blogRouteConst.initialBlog, updateBlogById);
router.delete(blogRouteConst.deleteblog, verifyUser, deleteBlogById);
router.post(
  blogRouteConst.createBlog,
  schemaValidator(blogRouteConst.createBlog),
  upload.array("files", 5),
  createBlog
);
router.post(blogRouteConst.updatePostStatus, verifyAdmin, changeBlogStatus);
router.get(blogRouteConst.getBlogFilter, getBlogByFilter);
router.get(blogRouteConst.getAllBlogs, getAllBlogs);
router.get(blogRouteConst.getBlogByUser, getBlogByUser);

module.exports = router;
