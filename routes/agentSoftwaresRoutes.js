import express from "express";
import hmac from "../middleware/hmac.js";
import { postAgentSoftware } from "../controllers/agentSoftwaresController.js";
import { inputValidation } from "../middleware/inputValidation.js";
import { agentSoftwaresSchema } from "../schemas/agentValidationSchema.js";

const router = express.Router();

// post Softwares
router.post("/softwares", hmac, inputValidation(agentSoftwaresSchema), postAgentSoftware);

export default router;
