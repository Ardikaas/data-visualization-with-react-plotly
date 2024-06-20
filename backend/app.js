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

app.get("/topviews", async (req, res) => {
  TedController.getTopFourViews(req, res);
});

app.get("/totalviews", async (req, res) => {
  TedController.getTotalViewsYear(req, res);
});

app.get("/totallikes", async (req, res) => {
  TedController.getTotalLikesYear(req, res);
});

app.get("/monthlyviews/:year", async (req, res) => {
  TedController.getMonthlyViews(req, res);
});

app.get("/monthlylikes/:year", async (req, res) => {
  TedController.getMonthlyLikes(req, res);
});

app.get("/monthlyvideos/:year/:month", async (req, res) => {
  TedController.getMonthlyVideos(req, res);
});

app.get("/videodetail/:id", async (req, res) => {
  TedController.getVideoDetail(req, res);
});

app.get("/analytictext", async (req, res) => {
  TedController.getAnalyticText(req, res);
});

app.post("/input", async (req, res) => {
  TedController.createData(req, res);
});

app.delete("/delete", async (req, res) => {
  TedController.deleteData(req, res);
});

app.listen(port, () => {
  console.log(`listening on port http://localhsot:${port}`);
});
