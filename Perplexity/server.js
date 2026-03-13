import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import dbConnect from "./src/config/database.js";
const PORT = 3000;

//  database calling
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
