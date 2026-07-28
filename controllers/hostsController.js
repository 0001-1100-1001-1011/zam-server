const service = require("../services/hostsService");

exports.getHosts = async (req, res) => {
  try {
    const hosts = await service.getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    console.error("Fehler beim Abrufen der Hosts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
