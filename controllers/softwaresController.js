const service = require("../services/softwaresService");

exports.getSoftwares = async (req, res) => {
  try {
    const softwares = await service.getSoftwares();
    res.status(200).json(softwares);
  } catch (error) {
    console.error("Fehler beim Abrufen der Softwares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postSoftwares = async (req, res) => {
  try {
    const softwares = await service.postSoftwares(req.body);
    // DEBUG
    console.log("Softwares created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    // DEBUG
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
