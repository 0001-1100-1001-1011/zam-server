const router = require("express").Router();
const controller = require("../controllers/signupController");

// user login
router.post("/signup", controller.createUsers);

module.exports = router;
