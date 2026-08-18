// Handling for the data
const db = require("../database/db");

exports.getHosts = async () => {
  try {
    // Try to get all hosts from the database
    const result = await db.query(
      `SELECT * FROM windows_hosts ORDER BY last_seen DESC `,
    );
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der Hosts:", error);

    // Return Error
    throw new Error("Hosts konnten nicht geladen werden");
  }
};
