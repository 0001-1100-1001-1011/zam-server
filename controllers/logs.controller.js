const service = require("../services/logs.service");

exports.getLogs = async (req, res) => {
  try {
    const logs = await service.getLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postLogs = async (req, res) => {
  try {
    const logs = await service.postLogs(req.body);
    // DEBUG
    console.log("Logs inserted");
    res.status(201).json(logs);
  } catch (err) {
    // DEBUG
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
