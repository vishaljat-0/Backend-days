const mongoose = require("mongoose");

const connectDB = async (async) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = connectDB;