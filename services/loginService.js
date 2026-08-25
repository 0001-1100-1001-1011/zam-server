import db from "../database/db.js";
import { argon2, timingSafeEqual } from "node:crypto";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export async function loginService(data) {
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
  } else {
    return user;
  }
}

export async function createAccessToken(user) {
  const result = await db.query(`SELECT id FROM monitoring_users WHERE username = $1`, [
    user.username,
  ]);
  const userId = result.rows[0].id;
  try {
    const accessToken = jwt.sign({ sub: userId, type: "access" }, process.env.ACCESS_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });
    return accessToken;
  } catch (error) {
    throw new Error("Failed to create Access-Token");
  }
}

export async function createRefreshToken(user) {
  const result = await db.query(`SELECT id FROM monitoring_users WHERE username = $1`, [
    user.username,
  ]);
  const userId = result.rows[0].id;
  if (!userId || userId == undefined)
    throw new Error("Failed to create Refresh-Token for given User ID");
  const jti = crypto.randomUUID();
  const familyId = crypto.randomUUID();

  try {
    const refreshToken = jwt.sign(
      { sub: userId, type: "refresh", jti: jti, familyId: familyId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    );

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    await db.query(
      `
      INSERT INTO refresh_tokens_familys
      (id, user_id, family_id, token_hash, expires_at)
      VALUES
      ($1, $2, $3, $4, NOW() + INTERVAL '30 days')
      `,
      [jti, userId, familyId, refreshTokenHash],
    );

    return refreshToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Refresh-Token");
  }
}
