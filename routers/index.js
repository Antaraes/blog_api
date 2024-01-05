const router = require("express").Router();
const userRoutes = require("./user");

router.use("/user", userRoutes);
// router.use("/blog", blogRoutes);

module.exports = router;
