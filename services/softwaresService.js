// Handling for the data
const db = require("../database/db");

exports.getSoftwares = async () => {
  try {
    // Try to get all Softwares from the database
    const result = await db.query(`SELECT * FROM windows_softwares`);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der Softwares:", error);

    // Return Error
    throw new Error("Softwares konnten nicht geladen werden");
  }
};

exports.postSoftwares = async (data) => {
  try {
    const result = await db.query(
      `
    INSERT INTO windows_softwares
    (
    hostname,
    software_version,
    software_name
    )
    VALUES ($1, $2, $3)
    `,
      [data.hostname, data.software_version, data.software_name],
    );
  } catch (error) {
    console.error("Fehler beim Erstellen der Softwares:", error);

    // Return Error
    throw new Error("Softwares konnten nicht erstellt werden");
  }
};
