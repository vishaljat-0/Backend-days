import { Router } from "express";
import {registercontroller} from "../controller/auth.controller.js";
import {registervalidation} from "../validations/auth.validation.js";

const authRouter = Router();


authRouter.post("/register", registervalidation, registercontroller);


export default authRouter;