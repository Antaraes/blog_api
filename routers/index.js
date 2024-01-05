const router = require("express").Router();
const userRoutes = require("./user");
const blogRoutes = require("./blog");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
