import express from "express";
import { getCVEs, getLastCVEs } from "../controllers/cveController.js";

const router = express.Router();

router.get("/cves", getCVEs);
router.get("/cves/last", getLastCVEs);

export default router;
