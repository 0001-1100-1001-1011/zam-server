import db from "../database/db.js";

export async function postAgentSoftwareService(data) {
  try {
    for (const s of data.software) {

      const name = s.name?.trim();
      if (!name) continue;

      const version = s.version?.trim() || "unknown";

      await db.query(
        `
        INSERT INTO windows_softwares(
        hostname, 
        software_name, 
        software_version
        )
        VALUES ($1, $2, $3)

        ON CONFLICT (
        hostname, 
        software_name
        )
         DO UPDATE SET
          software_version = EXCLUDED.software_version,
          last_seen = NOW()
        `,
        [data.hostname, name, version]
      );
    }
  } catch (error) {
    console.error("Fehler beim Erstellen der Softwares:", error);
    throw new Error("Softwares konnten nicht erstellt werden");
  }
}

