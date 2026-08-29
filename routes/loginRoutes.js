import express from "express";
import { userLogin } from "../controllers/loginController.js";
import { inputValidation } from "../middleware/inputValidation.js";
import { monitoringUserLoginSchema } from "../schemas/agentValidationSchema.js";

const router = express.Router();

router.post("/login", inputValidation(monitoringUserLoginSchema), userLogin);

export default router;
