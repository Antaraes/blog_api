const router = require("express").Router();
const userRoutes = require("./user");
const blogRoutes = require("./blog");
const authRoutes = require("./auth");

router.use("/user", userRoutes);
router.use("/blog", blogRoutes);
router.use("/auth", authRoutes);

module.exports = router;
