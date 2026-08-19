const service = require("../services/logsService");

exports.getLogs = async (req, res) => {
  try {
    const logs = await service.getLogs(req.query);
    res.status(200).json({ logs });
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.postLogs = async (req, res) => {
  try {
    const logs = await service.postLogs(req.body);
    // DEBUG
    console.log("Logs created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    // DEBUG
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
