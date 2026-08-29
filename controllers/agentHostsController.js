import {postAgentHostsService } from "../services/agentHostsService.js";

export async function postAgentHosts(req, res) {
  try {
    await postAgentHostsService(req.body);
    console.log("Hosts created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
