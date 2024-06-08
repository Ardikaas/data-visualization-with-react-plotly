const mongoose = require("mongoose");

const tedSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true],
  },
  author: {
    type: String,
    require: [true],
  },
  views: {
    type: Number,
    require: [true],
  },
  likes: {
    type: Number,
    require: [true],
  },
  link: {
    type: String,
    require: [true],
  },
  date: {
    type: String,
    require: [true],
  },
});

const Ted = mongoose.model("Ted", tedSchema);

module.exports = Ted;
