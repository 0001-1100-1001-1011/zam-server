const logService = require("../services/logsService");

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.getLogs();
    res.status(200).json(logs);
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
