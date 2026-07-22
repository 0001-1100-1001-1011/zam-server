require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/signup.routes"));
app.use("/auth", require("./routes/login.routes"));
app.use("/api", require("./routes/logs.routes"));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
