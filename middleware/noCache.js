export async function noCache(res, req, next) {
  res.header("Cache-Control", "private, no-cache, no-store");
  res.header("Pragma", "no-cache");
  next();
}
