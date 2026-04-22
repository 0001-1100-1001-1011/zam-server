const express = require("express");
const cors = require("cors");
const postgresPromise = require("pg-promise")();

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

const db = postgresPromise(DB_URL);
db.one("SELECT 1 as value")
  .then((data) => {
    console.log("verbunden ", data.value);
  })
  .catch((err) => {
    console.log("error ", err.message);
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
