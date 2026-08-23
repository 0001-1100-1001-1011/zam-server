import { getHostsService, postHostsService } from "../services/hostsService.js";

export async function getHosts(req, res) {
  try {
    const hosts = await getHostsService();
    res.status(200).json(hosts);
  } catch (error) {
    console.error("Fehler beim Abrufen der Hosts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postHosts(req, res) {
  try {
    await postHostsService(req.body);
    console.log("Hosts created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
