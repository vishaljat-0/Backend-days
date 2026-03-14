import express from "express";
import authRoute from "./routers/auth.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoute);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorMiddleware);
export default app;
