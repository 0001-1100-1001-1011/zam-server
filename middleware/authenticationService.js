import jwt from "jsonwebtoken";

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ") || token == null)
    return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { algorithms: ["HS256"] }, (err, payload) => {
    if (err) return res.status(401).json({ error: "Token invalid" });
    req.user = payload;
    next();
  });
}
