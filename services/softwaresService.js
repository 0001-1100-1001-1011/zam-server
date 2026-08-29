import db from "../database/db.js";

export async function getSoftwareService() {
  try {
    // Try to get all Softwares from the database
    const result = await db.query(`SELECT * FROM windows_softwares ORDER BY hostname ASC`);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der Softwares:", error);

    // Return Error
    throw new Error("Softwares konnten nicht geladen werden");
  }
}