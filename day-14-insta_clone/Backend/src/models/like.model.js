const mongoose = require("mongoose");
const likeschema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: [true, "post id is required"],
  },
  user: {
    type: String,
    required: [true, "username is required"],
  },
},{
     timestamps: true,
}
);

likeschema.index({ post: 1, user: 1 }, { unique: true });
const likemodel = mongoose.model("likes", likeschema);
module.exports = likemodel;
