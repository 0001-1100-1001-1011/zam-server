import express from "express";
import { userLogin } from "../controllers/loginController.js";

const router = express.Router();

router.post("/login", userLogin);

export default router;
