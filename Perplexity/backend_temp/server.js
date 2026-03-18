import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import dbConnect from "./src/config/database.js";
import { initserver } from "./src/socket/server.socket.js";
import http from "http";
const PORT = 3000;
const httpserver = http.createServer(app);
initserver(httpserver);

dbConnect();

httpserver.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
