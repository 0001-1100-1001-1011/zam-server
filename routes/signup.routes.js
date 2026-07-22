const router = require("express").Router();
const controller = require("../controllers/signup.controllers");

// user login
router.post("/signup", controller.createUsers);

module.exports = router;
