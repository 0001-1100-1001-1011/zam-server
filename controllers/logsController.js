const logService = require("../services/logsService");

exports.getLogs = (req, res) => {
  res.send("Logs werden abgerufen");
};

exports.createLogs = (req, res) => {
  res.send("Logs werden gespeichert");
};
