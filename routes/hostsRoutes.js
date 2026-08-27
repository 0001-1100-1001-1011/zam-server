import express from "express";
import { getHosts, postHosts } from "../controllers/hostsController.js";

const router = express.Router();

router.get("/hosts", getHosts);
router.post("/hosts", postHosts);

export default router;
