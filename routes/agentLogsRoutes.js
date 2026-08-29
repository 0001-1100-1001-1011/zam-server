import express from "express";
import hmac from "../middleware/hmac.js";
import { postAgentLogs } from "../controllers/agentLogsController.js";
import { inputValidation } from "../middleware/inputValidation.js";
import { agentLogsSchema } from "../schemas/agentValidationSchema.js";

const router = express.Router();

router.post("/logs", hmac, inputValidation(agentLogsSchema), postAgentLogs);

export default router;
