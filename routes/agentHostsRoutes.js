import express from "express";
import hmac from "../middleware/hmac.js";
import { postAgentHosts } from "../controllers/agentHostsController.js";
import { inputValidation } from "../middleware/inputValidation.js";
import { agentHostsSchema } from "../schemas/agentValidationSchema.js";

const router = express.Router();

router.post("/hosts", hmac, inputValidation(agentHostsSchema), postAgentHosts);

export default router;
