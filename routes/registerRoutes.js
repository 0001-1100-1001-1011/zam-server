import express from "express";
import { register } from "../controllers/registerController.js";

const router = express.Router();

// user login
router.post("/register", register);

export default router;
