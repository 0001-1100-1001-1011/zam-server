const db = require("../database/db");
const bcrypt = require("bcrypt");

exports.createUsers = async (data) => {
  // Encrypt password with 12 rounds
  const passwordHash = await bcrypt.hash(data.password, 12);
  // Insert data with sql
  const result = await db.query(
    `INSERT INTO monitoring_users 
    (username, email, password_hash)
    VALUES ($1,$2,$3)
    RETURNING id, username, email`,
    [data.username, data.email, passwordHash],
  );

  return result.rows[0];
};
