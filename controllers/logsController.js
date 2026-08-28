import { getLogsService} from "../services/logsService.js";

export async function getLogs(req, res) {
  try {
    const logs = await getLogsService(req.query);
    res.status(200).json({ logs });
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}