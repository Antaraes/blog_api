const router = require("express").Router();
const userRoutes = require("./user");
const blogRoutes = require("./blog");
const authRoutes = require("./auth");
const categoryRoutes = require("./category");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);

module.exports = router;
