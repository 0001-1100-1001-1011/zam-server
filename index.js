require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Routes
app.use("/auth", require("./routes/signupRoutes"));
app.use("/auth", require("./routes/loginRoutes"));
app.use("/api", require("./routes/logsRoutes"));
app.use("/api", require("./routes/hostsRoutes"));

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
