const mongoose = require("mongoose");
const { use } = require("../app");
const userschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
  },
  password: {
    type: String,
  },
});

const usermodel= mongoose.model("user",userschema)

module.exports=usermodel