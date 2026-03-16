import dotenv from "dotenv";
dotenv.config();

import { testfn } from "./src/services/ai.service.js";
import app from "./src/app.js";
import dbConnect from "./src/config/database.js";

const PORT = 3000;

dbConnect();

testfn();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});