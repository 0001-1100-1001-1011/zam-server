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


export async function postHostsService(data) {
  const key = process.env.PG_ENCRYPTION_KEY;

  try {
    const result = await db.query(
      ` 
      INSERT INTO windows_hosts
      (
        hostname,
        ip_address,
        cpu_model,
        ram_size,
        gpu_model,
        storage_size,
        operating_system,
        hmac_key_encrypted
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        pgp_sym_encrypt($8, $9)
      )
      ON CONFLICT (hostname) DO UPDATE SET
        ip_address        = EXCLUDED.ip_address,
        cpu_model         = EXCLUDED.cpu_model,
        ram_size          = EXCLUDED.ram_size,
        gpu_model         = EXCLUDED.gpu_model,
        storage_size      = EXCLUDED.storage_size,
        operating_system  = EXCLUDED.operating_system,
        hmac_key_encrypted = pgp_sym_encrypt($8, $9)
      `,
      [
        data.hostname,
        data.ip_address,
        data.cpu_model,
        data.ram_size,
        data.gpu_model,
        data.storage_size,
        data.operating_system,
        data.hmac_key,
        key
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Fehler beim Erstellen des Hosts:", error);
    throw new Error("Host konnte nicht erstellt werden");
  }
}
