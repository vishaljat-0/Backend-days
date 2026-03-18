import express from "express";
import authRoute from "./routers/auth.route.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import chatRouter from "./routers/chat.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);
app.use("/api/chats", chatRouter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use(errorMiddleware);
export default app;
