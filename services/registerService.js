import db from "../database/db.js";
import { argon2, randomBytes } from "node:crypto";

export async function createUser(data) {
  const password_salt = randomBytes(16);

  const argonParameters = {
    message: data.password,
    nonce: password_salt,
    parallelism: 4,
    tagLength: 64,
    memory: 65536,
    passes: 3,
  };

  await new Promise(resolve, (reject) => {
    argon2("argon2id", argonParameters, async (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      const result = await db.query(
        `INSERT INTO monitoring_users 
        (username, email, password_hash, password_salt)
        VALUES ($1, $2, $3, $4)
        `,
        [data.username, data.email, derivedKey.toString("hex"), password_salt.toString("hex")],
      );
      console.log("New user: '" + data.username + "', ", result);
    });
    resolve(true);
  });
}
