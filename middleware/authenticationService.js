import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ["HS256"] }, (err, payload) => {
    if (err) return res.status(401).json({ error: "Token invalid" });
    payload.type == "access" ? next() : res.status(401).json({ error: "Token invalid" });
  });
}
