import { refreshService } from "../services/refreshService.js";

export async function refreshController(req, res) {
  try {
    const refreshToken = await refreshService(req.body);
    res.status(200).json({ refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error(error.message);
  }
}
