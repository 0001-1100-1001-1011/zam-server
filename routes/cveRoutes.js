const router = require("express").Router();
const controller = require("../controllers/cveController");

// get CVEs
router.get("/cves", controller.getCVEs);
router.get("/cves/last", controller.getLastCVEs);

module.exports = router;
