const router = require("express").Router();
const controller = require("../controllers/login.controller");

// user login
router.post("/login", controller.userLogin);

module.exports = router;
