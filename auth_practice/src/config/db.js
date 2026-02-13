const mongoose = require("mongoose");
let cntodb = () => async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connection successful"))
    .catch((err) => console.log(err));
};
module.exports = cntodb;
