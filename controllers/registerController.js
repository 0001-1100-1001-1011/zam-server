import { createUser } from "../services/registerService.js";

export async function register(req, res) {
  try {
    await createUser(req.body);
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
