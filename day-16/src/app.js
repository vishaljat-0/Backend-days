import express from "express";
import errormiddleware from "./middleware/error.middleware.js";
import authRoute from "./router/auth.route.js";
 const app = express();

 app.use("/api/auth",authRoute);


 app.use(errormiddleware);




 export default app;