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

exports.postHosts = async (req, res) => {
  try {
    const hosts = await service.postHosts(req.body);
    // DEBUG
    console.log("Hosts created");
    res.status(201).json({ message: "created" });
  } catch (error) {
    // DEBUG
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
