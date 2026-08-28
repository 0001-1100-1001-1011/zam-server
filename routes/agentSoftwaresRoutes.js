import express from "express";
import hmac from "../middleware/hmac.js";
import { postAgentSoftware } from "../controllers/agentSoftwaresController.js";

const router = express.Router();

// post Softwares
router.post("/softwares",hmac, postAgentSoftware);

export default router;
