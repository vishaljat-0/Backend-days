import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidation,  } from "../validation/auth.validate.js";

const authRoute = Router();
authRoute.post("/register", registerValidation,  registerController)


export default authRoute;




