const express = require("express");
const router = express.Router();
const logsController = require("../controllers/logsController");

// get logs
router.get("/logs", logsController.getLogs);

//create logs
//router.post("/logs", logsController.createLogs);

module.exports = router;
