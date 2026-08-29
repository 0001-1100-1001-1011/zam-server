import db from "../database/db.js";

export async function getHostsService() {
  try {
    // Try to get all hosts from the database
    const result = await db.query(`SELECT * FROM windows_hosts ORDER BY last_seen DESC `);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der Hosts:", error);

    // Return Error
    throw new Error("Hosts konnten nicht geladen werden");
  }
}