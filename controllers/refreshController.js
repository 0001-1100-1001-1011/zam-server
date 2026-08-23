import { refreshService } from "../services/refreshService.js";

export async function refreshController(data) {
  try {
    const refreshToken = await refreshService(data);
    res.status(200).json({ refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    throw new Error(error.message);
  }
}
