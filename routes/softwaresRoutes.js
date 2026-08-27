import express from "express";
import { getSoftware, postSoftware } from "../controllers/softwaresController.js";

const router = express.Router();

// get Softwares
router.get("/softwares", getSoftware);
router.post("/softwares", postSoftware);

export default router;
