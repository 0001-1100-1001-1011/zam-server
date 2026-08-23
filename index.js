import dotenv from "dotenv";
import cookierParser from "cookie-parser";
import express from "express";
import cors from "cors";

//routefiles
import registerRoute from "./routes/registerRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import logRoute from "./routes/logsRoutes.js";
import hostRoute from "./routes/hostsRoutes.js";
import cveRoute from "./routes/cveRoutes.js";
import softwareRoute from "./routes/softwaresRoutes.js";

import authenticateToken from "./middleware/authenticationService.js";

import "./cronjob/dailyCVE.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(cookierParser());

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

// Routes
app.use("/auth", registerRoute);
app.use("/auth", loginRoute);

app.use("/api", authenticateToken);

app.use("/api", logRoute);
app.use("/api", hostRoute);
app.use("/api", softwareRoute);
app.use("/api", cveRoute);

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
