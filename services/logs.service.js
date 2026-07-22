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

exports.postLogs = async (data) => {
  const result = await db.query(
    `
    INSERT INTO windows_logs
    (
    client_id,
    hostname,
    time_created,
    level,
    source,
    event_source,
    event_id,
    keyword,
    message
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `,
    [
      data.client_id,
      data.hostname,
      data.time_created,
      data.level,
      data.source,
      data.eventSource,
      data.event_id,
      data.keyword,
      data.message,
    ],
  );

  return result.rows[0];
};
