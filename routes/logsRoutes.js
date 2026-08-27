import express from "express";
import hmac from "../middleware/hmac.js";
import { getLogs, postLogs } from "../controllers/logsController.js";

const router = express.Router();

router.get("/logs", getLogs);
router.post("/logs", hmac, postLogs);

export default router;
