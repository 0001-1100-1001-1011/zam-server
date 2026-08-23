import { loginService, createAccessToken, createRefreshToken } from "../services/loginService.js";

export async function userLogin(req, res) {
  try {
    const user = await loginService(req.body);

    const accessToken = await createAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
}
