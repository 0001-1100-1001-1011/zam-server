const db = require("../database/db");
const { argon2, timingSafeEqual } = require("node:crypto");
const jwt = require("jsonwebtoken");

exports.login = async (data) => {
  const result = await db.query("SELECT * FROM monitoring_users WHERE username = $1", [
    data.username,
  ]);

  const user = result.rows[0];

  if (!user) {
    throw new Error("Authentication failed");
  }

  const argonParameters = {
    message: data.password,
    nonce: Buffer.from(user.password_salt, "hex"),
    parallelism: 4,
    tagLength: 64,
    memory: 65536,
    passes: 3,
  };

  const derivedKey = await new Promise((resolve, reject) => {
    argon2("argon2id", argonParameters, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey);
      }
    });
  });

  const storedHash = Buffer.from(user.password_hash, "hex");

  if (!timingSafeEqual(derivedKey, storedHash)) {
    throw new Error("Authentication failed");
  }

  //const compareHash = await bcrypt.compare(password, user.password_hash);

  //const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  //  expiresIn: process.env.JWT_EXPIRES_IN,
  //});

  return "yes";
};
