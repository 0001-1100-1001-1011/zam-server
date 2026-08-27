import crypto from "crypto";

const SECRET = Buffer.from(process.env.HMAC_SECRET, "hex");

export default function hmacMiddleware(req, res, next) {
  const signature = req.headers["x-signature"];
  if (!signature) {
    return res.status(403).json({ error: "missing signature" });
  }

  const raw = req.rawBody;
  const expected = crypto.createHmac("sha256", SECRET).update(raw).digest("hex");

  if (expected !== signature) {
    return res.status(403).json({ error: "invalid signature" });
  }

  next();
}
