const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "link is required"],
  },
  posterUrl: {
    type: String,
    required: [true, "poster link is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  type: String,
  enum: {
    values: ["sad", "happy", "surprised"],
  },
});
const songmodel = mongoose.model("song", songSchema);
module.exports = songmodel;
