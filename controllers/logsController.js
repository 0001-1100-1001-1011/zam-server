import { getLogsService, postLogsService } from "../services/logsService.js";

export async function getLogs(req, res) {
  try {
    const logs = await getLogsService(req.query);
    res.status(200).json({ logs });
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postLogs(req, res) {
  try {
    await postLogsService(req.body);
    console.log("Logs created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
