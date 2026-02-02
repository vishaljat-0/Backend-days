require("dotenv").config();
const app = require("./src/app");
const connectdb = require("./src/config/database");

const startServer = async () => {
  try {
    await connectdb();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();
