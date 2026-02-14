const mongoose = require("mongoose");
const cdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URi);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
module.exports = cdb;