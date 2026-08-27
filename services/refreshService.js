import db from "../database/db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function refreshService(req) {
  const providedToken = req.cookies.refreshToken;
  if (!providedToken || providedToken == "undefined") {
    throw new Error("No token provided");
  }

  try {
    // prüfe ob es überhaupt ein gültiger jwt nach unserem schema ist
    const payload = jwt.verify(providedToken, process.env.REFRESH_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
    if (!payload.jti || !payload.sub || !payload.familyId) throw new Error("Refresh Token invalid");
    if (payload.type !== "refresh") throw new Error("Refresh Token invalid");

    // wir müssen zwei operationen als eine ausführen um race conditions zu umgehen
    const dbClient = await db.connect();

    try {
      await dbClient.query("BEGIN");

      // prüfe ob vom beigelegten jwt ein gültiger (z.b. ungenutzer) token in der db existiert
      const result = await dbClient.query(
        `
      UPDATE refresh_tokens_familys
      SET used_at = NOW()
      WHERE id = $1
        AND user_id = $2
        AND family_id = $3
        AND expires_at > NOW()
        AND used_at IS NULL
        AND revoked_at IS NULL
      RETURNING *
      `,
        [payload.jti, payload.sub, payload.familyId],
      );

      // wenn es keinen gültigen eintrag gibt, check warum
      if (result.rowCount !== 1) {
        const checkFailiure = await dbClient.query(
          `SELECT * FROM refresh_tokens_familys WHERE id = $1`,
          [payload.jti],
        );

        if (checkFailiure.rowCount === 0) throw new Error("Refresh Token does not exist");

        const claim = checkFailiure.rows[0];

        if (claim.used_at !== null) {
          await dbClient.query(
            `
          UPDATE refresh_tokens_familys
          SET revoked_at = NOW()
          WHERE family_id = $1
          AND revoked_at IS NULL
          `,
            [claim.family_id],
          );
          console.error("REFRESH TOKEN REUSE DETECTED");
          throw new Error("REFRESH TOKEN REUSE DETECTED");
        }

        if (claim.revoked_at !== null) throw new Error("Refresh token revoked");

        if (new Date(claim.expires_at) <= new Date()) throw new Error("Refresh token expired");

        // wenn keiner der obigen fehler schmeiß einfach irgendwas
        throw new Error("Invalid refresh token");
      }

      // neuen refresh token erzeugen
      const jti = crypto.randomUUID();
      const refreshToken = jwt.sign(
        { sub: payload.sub, type: "refresh", jti: jti, familyId: payload.familyId },
        process.env.REFRESH_TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
        },
      );

      // theoretisch wird das nicht benötigt, wir legen den hash des token trotzem als referenz dabei
      // bei einem Angriff auf die db kann somit kein gültiger token ergattert werden
      const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

      // die zweite db operation, anlegen des neuen tokens
      await dbClient.query(
        `
      INSERT INTO refresh_tokens_familys
      (id, user_id, family_id, token_hash, expires_at)
      VALUES
      ($1, $2, $3, $4, NOW() + INTERVAL '30 days')
      `,
        [jti, payload.sub, payload.familyId, refreshTokenHash],
      );

      // replaced_by setzen
      await dbClient.query(
        `
        UPDATE refresh_tokens_familys
        SET replaced_by = $1
        WHERE id = $2
        `,
        [jti, payload.jti],
      );

      // neuen accessToken generieren
      const accessToken = jwt.sign(
        { sub: payload.sub, type: "access" },
        process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        },
      );

      await dbClient.query("COMMIT");
      return { accessToken, refreshToken };
    } catch (error) {
      await dbClient.query("ROLLBACK");
      throw error;
    } finally {
      dbClient.release();
    }
  } catch (error) {
    console.error(error);
    throw new Error("Invalid Refresh Token");
  }
}
