import db from "../database/db.js";

export async function postAgentLogsService(data) {
  const dbClient = await db.connect();

  try {
    await dbClient.query("BEGIN");

    await dbClient.query(
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

    await dbClient.query(
      `
      UPDATE windows_hosts
      SET last_seen = NOW()
      WHERE hostname = $1
      `,
      [data.hostname],
    );
    await dbClient.query("COMMIT");
  } catch (error) {
    await dbClient.query("ROLLBACK");
    throw new Error("Logs konnten nicht erstellt werden");
  } finally {
    dbClient.release();
  }
}
