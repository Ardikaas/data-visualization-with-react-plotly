const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const TedController = require("./controller/tedController");
const cors = require("cors");
require("dotenv").config();

const app = express();
const uri = process.env.URI;
const port = process.env.PORT;

mongoose
  .connect(uri, {})
  .then((result) => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.get("/all", async (req, res) => {
  TedController.getAllData(req, res);
});

app.post("/input", async (req, res) => {
  TedController.createData(req, res);
});

app.listen(port, () => {
  console.log(`listening on port http://localhsot:${port}`);
});
