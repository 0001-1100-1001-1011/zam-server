import { getHostsService} from "../services/hostsService.js";

export async function getHosts(req, res) {
  try {
    const hosts = await getHostsService();
    res.status(200).json(hosts);
  } catch (error) {
    console.error("Fehler beim Abrufen der Hosts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}