import { postAgentLogsService } from "../services/agentLogsService.js";

export async function postAgentLogs(req, res) {
  try {
    await postAgentLogsService(req.body);
    console.log("Logs created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
