import { getCVEsService, getLastCVEsService } from "../services/cveService.js";

export async function getCVEs(req, res) {
  try {
    const cves = await getCVEsService();
    res.status(200).json(cves);
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getLastCVEs(req, res) {
  try {
    const cves = await getLastCVEsService();
    res.status(200).json(cves);
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
