// Handling for the data
const db = require("../database/db");

exports.getLogs = async () => {
  const result = await db.query(`SELECT * FROM windows_logs`);

  return result.rows;
};
