const router = require("express").Router();
const controller = require("../controllers/softwaresController");

// get Softwares
router.get("/softwares", controller.getSoftwares);
router.post("/softwares", controller.postSoftwares);

module.exports = router;
