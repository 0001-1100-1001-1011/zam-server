const router = require("express").Router();
const controller = require("../controllers/logsController");
const hmac = require("../middleware/hmac");

// get logs
router.get("/logs", controller.getLogs);
router.post("/logs", hmac, controller.postLogs);

module.exports = router;
