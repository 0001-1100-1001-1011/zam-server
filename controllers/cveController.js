const service = require("../services/cveService");

exports.getCVEs = async (req, res) => {
  try {
    const cves = await service.getCVEs();
    res.status(200).json(cves);
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLastCVEs = async (req, res) => {
  try {
    const cves = await service.getLastCVEs();
    res.status(200).json(cves);
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
