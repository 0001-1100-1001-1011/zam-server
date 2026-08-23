import db from "../database/db.js";
import { argon2, timingSafeEqual } from "node:crypto";
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
  try {
    const accessToken = jwt.sign(
      { sub: user.username, type: "access" },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
      },
    );
    return accessToken;
  } catch (error) {
    throw new Error("Failed to create Access-Token");
  }
}

export async function createRefreshToken(user) {
  try {
    const refreshToken = jwt.sign(
      { sub: user.username, type: "refresh" },
      process.env.REFRESH_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      },
    );
    return refreshToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Refresh-Token");
  }
}
