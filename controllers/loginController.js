import { loginService, createAccessToken, createRefreshToken } from "../services/loginService.js";

export async function userLogin(req, res) {
  try {
    const user = await loginService(req.body);

    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // muss bei umstieg auf HTTPS auf true gesetzt werden!
        sameSite: "lax", // kann mit proxy eig auf "strict" gesetzt werden für maximale cross-site-request-forgery protection
        path: "/auth/refresh",
        maxAge: 60 * 60 * 24 * 30, // in Sekunden, auf 30 Tage
      })
      .status(200)
      .json({ accessToken: accessToken });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
}
