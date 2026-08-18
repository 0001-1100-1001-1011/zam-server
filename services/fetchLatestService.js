const db = require("../database/db");

exports.fetchLatestCVEs = async () => {
  try {
    const startDate = new Date(Date.now() - 86400000);
    const endDate = new Date();

    // Build new URL for lookup
    const params = new URLSearchParams({
      pubStartDate: startDate.toISOString(),
      pubEndDate: endDate.toISOString(),
      resultsPerPage: "100",
    });

    const response = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?${params}`,
    );

    if (!response.ok) {
      throw new Error("Ungültige Antwort erhalten.");
    }

    const data = await response.json();

    return data.vulnerabilities;
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);

    // Return Error
    throw new Error("CVEs konnten nicht geladen werden");
  }
};

exports.postCVEs = async (vulnerabilities) => {
  try {
    for (const vulnerability of vulnerabilities) {
      const cve = vulnerability.cve;
      const cve_id = cve.id;
      const product =
        cve?.affected?.[0]?.affectedData?.[0]?.product ?? "Unknown";
      const description = cve?.descriptions?.[0]?.value ?? "No description";
      const published_at = cve.published;

      await db.query(
        `
        INSERT INTO nist_cves (
          cve_id,
          product,
          description,
          published_at
        )
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (cve_id) DO NOTHING
        `,
        [cve_id, product, description, published_at],
      );
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der CVEs:", error);

    // Return Error
    throw new Error("CVEs konnten nicht geladen werden");
  }
};
