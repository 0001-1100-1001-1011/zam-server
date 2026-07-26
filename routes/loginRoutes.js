const router = require("express").Router();
const controller = require("../controllers/loginController");

// user login
router.post("/login", controller.userLogin);

module.exports = router;
