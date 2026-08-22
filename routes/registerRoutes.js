const router = require("express").Router();
const controller = require("../controllers/registerController");

// user login
router.post("/register", controller.createUser);

module.exports = router;
