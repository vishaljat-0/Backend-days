const mongoose = require("mongoose");
const followschema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "status must be pending,accepted or rejected",
      },
    },
  },
  {
    timestamps: true,
  },
);
followschema.index({ follower: 1, followee: 1 }, { unique: true });
const followmodel = mongoose.model("follows", followschema);
module.exports = followmodel;
