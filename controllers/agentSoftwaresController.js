import { postAgentSoftwareService } from "../services/agentSoftwaresService.js";

export async function postAgentSoftware(req, res) {
  try {
    await postAgentSoftwareService(req.body);
    console.log("Softwares created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
