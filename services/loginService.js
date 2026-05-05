const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (username, password) => {
  // Search user in databse
  const result = await db.query("SELECT * FROM admin_acc WHERE username = $1", [
    username,
  ]);

  const user = result.rows[0];

  // If user does not exist
  if (!user) {
    throw new Error("User does not exist");
  }

  // Check password
  const compareHash = await bcrypt.compare(password, user.password_hash);

  if (!compareHash) {
    throw new Error("Authentication failed");
  }

  // Create JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
