const router = require("express").Router();
const controller = require("../controllers/logs.controller");

// get logs
router.get("/logs", controller.getLogs);
router.post("/logs", controller.postLogs);

module.exports = router;
