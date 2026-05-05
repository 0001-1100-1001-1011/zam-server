// Handling for the data
const db = require("../database/db");

exports.getLogs = async () => {
  try {
    // Try to get all logs from the database
    const result = await db.query(`SELECT * FROM windows_logs`);
    return result.rows;

  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);

    // Return Error
    throw new Error("Logs konnten nicht geladen werden");
  }
};