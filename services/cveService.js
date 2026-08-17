// Handling for the data
const db = require("../database/db");

exports.getCVEs = async () => {
  try {
    // Try to get all cves from the database
    const result = await db.query(`SELECT * FROM nist_cves`);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);

    // Return Error
    throw new Error("CVEs konnten nicht geladen werden");
  }
};

// Get the last 25 Records
exports.getLastCVEs = async () => {
  try {
    // Try to get the last 10 cves from the database
    const result = await db.query(
      `SELECT * FROM nist_cves ORDER BY ID DESC LIMIT 25`,
    );
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);

    // Return Error
    throw new Error("CVEs konnten nicht geladen werden");
  }
};
