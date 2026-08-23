import db from "../database/db.js";
import jwt from "jsonwebtoken";

export async function refreshService(token) {
  // rotate token, write old into db for replay attack check
}
