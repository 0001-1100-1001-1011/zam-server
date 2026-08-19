// Handling for the data
const db = require("../database/db");

exports.getLogs = async (filters = {}) => {
  try {
    const { source, level, clientId, search, limit = 100 } = filters;

    const conditions = [];
    const values = [];
    let paramIndex = 1;

    if (source) {
      conditions.push(`source ILIKE $${paramIndex}`);
      values.push(`%${source}%`);
      paramIndex++;
    }
    if (level) {
      conditions.push(`level = $${paramIndex}`);
      values.push(level.toUpperCase());
      paramIndex++;
    }
    if (clientId) {
      conditions.push(`client_id = $${paramIndex}`);
      values.push(clientId);
      paramIndex++;
    }
    if (search) {
      conditions.push(`message ILIKE $${paramIndex}`);
      values.push(`%${search}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    values.push(Number(limit));
    const limitClause = `LIMIT $${paramIndex}`;

    const query = `
      SELECT * FROM windows_logs
      ${whereClause}
      ORDER BY id DESC
      ${limitClause}
    `;

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    throw new Error("Logs konnten nicht geladen werden");
  }
};

exports.postLogs = async (data) => {
  try {
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
    `,
      [
        data.client_id,
        data.hostname,
        data.time_created,
        data.level,
        data.source,
        data.event_source,
        data.event_id,
        data.keyword,
        data.message,
      ],
    );

    await db.query(
      `
      UPDATE windows_hosts
      SET last_seen = NOW()
      WHERE hostname = $1
      `,
      [data.hostname],
    );
  } catch (error) {
    console.error("Fehler beim Erstellen der Logs:", error);

    // Return Error
    throw new Error("Logs konnten nicht erstellt werden");
  }
};