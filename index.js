require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const logsRoutes = require("./routes/logs");
app.use("/api", logsRoutes);

const loginRoutes = require("./routes/login");
app.use("/api", loginRoutes);


app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
