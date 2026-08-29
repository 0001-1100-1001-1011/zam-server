import express from "express";
import { getSoftware } from "../controllers/softwaresController.js";

const router = express.Router();

// get Softwares
router.get("/softwares", getSoftware);

export default router;
