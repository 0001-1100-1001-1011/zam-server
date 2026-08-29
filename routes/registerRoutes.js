import express from "express";
import { register } from "../controllers/registerController.js";
import { inputValidation } from "../middleware/inputValidation.js";
import { monitoringUserRegisterSchema } from "../schemas/agentValidationSchema.js";

const router = express.Router();

// user login
router.post("/register", inputValidation(monitoringUserRegisterSchema), register);

export default router;
