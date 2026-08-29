import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

dotenv.config();

//routefiles
import registerRoute from "./routes/registerRoutes.js";
import loginRoute from "./routes/loginRoutes.js";
import refreshRoute from "./routes/refreshRoute.js";
import logRoute from "./routes/logsRoutes.js";
import hostRoute from "./routes/hostsRoutes.js";
import cveRoute from "./routes/cveRoutes.js";
import softwareRoute from "./routes/softwaresRoutes.js";
import agentLogsRoutes from "./routes/agentLogsRoutes.js";
import agentHostsRoutes from "./routes/agentHostsRoutes.js";
import agentSoftwareRoutes from "./routes/agentSoftwaresRoutes.js";


import authenticateToken from "./middleware/authenticationService.js";
import { noCache } from "./middleware/noCache.js";

import "./cronjob/dailyCVE.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

// Routes
app.use("/auth", registerRoute);
app.use("/auth", noCache, loginRoute);


//Agent-Routes
app.use("/agent-api", agentLogsRoutes);
app.use("/agent-api", agentHostsRoutes);
app.use("/agent-api", agentSoftwareRoutes);

//Protected Routes
app.use("/api", authenticateToken);
app.use("/auth", noCache, refreshRoute);
app.use("/api", logRoute);
app.use("/api", hostRoute);
app.use("/api", softwareRoute);
app.use("/api", cveRoute);

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
