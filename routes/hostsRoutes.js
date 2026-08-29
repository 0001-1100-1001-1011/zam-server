import express from "express";
import { getHosts} from "../controllers/hostsController.js";

const router = express.Router();

router.get("/hosts", getHosts);

export default router;
