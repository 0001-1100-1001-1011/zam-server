import db from "../database/db.js";

export async function getCVEsService() {
  try {
    // Try to get all cves from the database
    const result = await db.query(`SELECT * FROM nist_cves`);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);

    // Return Error
    throw new Error("CVEs konnten nicht geladen werden");
  }
}

// Get the last 25 Records
export async function getLastCVEsService() {
  try {
    // Try to get the last 10 cves from the database
    const result = await db.query(`SELECT * FROM nist_cves ORDER BY ID DESC LIMIT 25`);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);

    // Return Error
    throw new Error("CVEs konnten nicht geladen werden");
  }
}
