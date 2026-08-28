import { getSoftwareService} from "../services/softwaresService.js";

export async function getSoftware(req, res) {
  try {
    const softwares = await getSoftwareService();
    res.status(200).json(softwares);
  } catch (error) {
    console.error("Fehler beim Abrufen der Softwares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}