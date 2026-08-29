import { z } from "zod";

export function inputValidation(schema) {
  return (req, res, next) => {
    try {
      const result = schema.parse(req.body);
      req.body = result;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues;
        res.status(400).json({ message: "Invalid request data" });
        throw new Error("An error occured during validation");
      }
      res.status(500).json({ message: "Internal Server Error" });
      throw new Error("Unexpected error during host input validation");
    }
  };
}
