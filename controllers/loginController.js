import { loginService, createAcessToken } from "../services/loginService.js";

export async function userLogin(req, res) {
  try {
    const user = await loginService(req.body);

    const accessToken = await createAcessToken(user);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message });
  }
}
