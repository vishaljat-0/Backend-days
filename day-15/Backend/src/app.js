const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use(express.json());
const authRoute = require("./routes/auth.route");
const songRoute = require("./routes/song.route");

app.use("/api/auth", authRoute);
app.use("/api/song", songRoute);


module.exports = app;
