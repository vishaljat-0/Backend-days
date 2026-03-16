import { Router } from "express";
import { registerController,emailverificationController,logincontroller,getmecontroller } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validation/auth.validate.js";
import { authmiddleware } from "../middleware/auth.middleware.js";

const authRoute = Router();
authRoute.post("/register", registerValidation,  registerController)
authRoute.post("/login",loginValidation,logincontroller) 
authRoute.get("/getme",authmiddleware,getmecontroller)
authRoute.get("/verifyemail",emailverificationController)

export default authRoute;




