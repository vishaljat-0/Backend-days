require("dotenv").config();
const app = require("./src/app");
const cntodb = require("./src/config/db");
cntodb()();

app.listen(3000, (req, res) => {
  console.log("server is running on port 3000");
});
