import express from "express";
import hmac from "../middleware/hmac.js";
import { postAgentHosts} from "../controllers/agentHostsController.js";

const router = express.Router();

router.post("/hosts", hmac, postAgentHosts);

export default router;