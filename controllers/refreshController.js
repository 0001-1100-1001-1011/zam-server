import { refreshService } from "../services/refreshService.js";

export async function refreshController(req, res) {
  try {
    const { accessToken, refreshToken } = await refreshService(req);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // muss bei umstieg auf HTTPS auf true gesetzt werden!
        sameSite: "lax", // kann mit proxy eig auf "strict" gesetzt werden für maximale cross-site-request-forgery protection
        path: "/auth/refresh",
        maxAge: 60 * 60 * 24 * 30 * 1000, // in Millikunden, auf 30 Tage
      })
      .status(200)
      .json({ accessToken: accessToken });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error(error.message);
  }
}
