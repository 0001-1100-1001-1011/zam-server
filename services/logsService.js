import db from "../database/db.js";

export async function getLogsService(filters = {}) {
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

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    values.push(Number(limit));
    const limitClause = `LIMIT $${paramIndex}`;

    const query = `
      SELECT * FROM windows_logs
      ${whereClause}
      ORDER BY time_created DESC
      ${limitClause}
    `;

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Fehler beim Abrufen der Logs:", error);
    throw new Error("Logs konnten nicht geladen werden");
  }
}
