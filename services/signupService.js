const db = require("../database/db");
const bcrypt = require("bcrypt");

exports.createUsers = async (data) => {
  try {
    // Encrypt password with 12 rounds
    const passwordHash = await bcrypt.hash(data.password, 12);
    // Insert data with sql
    const result = await db.query(
      `INSERT INTO monitoring_users 
    (username, email, password_hash)
    VALUES ($1,$2,$3)
    `,
      [data.username, data.email, passwordHash],
    );
  } catch (error) {
    console.error("Fehler beim Erstellen des Users:", error);

    // Return Error
    throw new Error("User konnten nicht erstellt werden");
  }
};
