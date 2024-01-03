const { getUserDetails, signup, signin } = require("../controller/user.controller");
const { schemaValidator } = require("../middleware/schemaValidator");

const router = require("express").Router();

router.get("/me", getUserDetails);
router.post("/signup", schemaValidator("/auth/signup"), signup);
router.post("/signin", schemaValidator("/auth/signin"), signin);

module.exports = router;
