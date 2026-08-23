import { refreshService } from "../services/refreshService.js";

export async function refreshController(token) {
  try {
    const freshToken = await refreshService(token);
    res.status(200).json({ refreshToken: freshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error(error.message);
  }
}
