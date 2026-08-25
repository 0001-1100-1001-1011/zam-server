export async function noCache(req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store");
  res.header("Pragma", "no-cache");
  next();
}
