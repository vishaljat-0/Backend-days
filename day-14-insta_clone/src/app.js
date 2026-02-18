const express = require("express");
const authRouter = require("./routes/auth.route");
const postRouter= require("./routes/post.route")
const userouter=require("./routes/user.route")

const cookieparser=require("cookie-parser")
const app = express();
app.use(express.json());
app.use(cookieparser())

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/user",userouter)





module.exports = app;
