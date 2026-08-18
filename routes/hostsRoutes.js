const router = require("express").Router();
const controller = require("../controllers/hostsController");

// get hosts
router.get("/hosts", controller.getHosts);
router.post("/hosts", controller.postHosts);

module.exports = router;
