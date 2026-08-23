import { createUser } from "../services/registerService.js";

export async function register(req, res) {
  createUser(req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: "User created" });
  });
}
