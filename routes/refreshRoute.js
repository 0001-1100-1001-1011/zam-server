import express from "express";
import { refreshController } from "../controllers/refreshController.js";

const router = express.Router();

router.post("/refresh", refreshController);

export default router;
