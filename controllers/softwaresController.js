import { getSoftwareService, postSoftwareService } from "../services/softwaresService.js";

export async function getSoftware(req, res) {
  try {
    const softwares = await getSoftwareService();
    res.status(200).json(softwares);
  } catch (error) {
    console.error("Fehler beim Abrufen der Softwares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function postSoftware(req, res) {
  try {
    await postSoftwareService(req.body);
    console.log("Softwares created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}
