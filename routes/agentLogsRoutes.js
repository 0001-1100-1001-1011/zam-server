import express from "express";
import hmac from "../middleware/hmac.js";
import { postAgentLogs } from "../controllers/agentLogsController.js";

const router = express.Router();

router.post("/logs", hmac, postAgentLogs);

export default router;
