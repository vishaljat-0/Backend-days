const express = require("express");
const authRouter = express.Router();
const {register,login,getuser}=require("../controllers/auth.controller")
 const authcontroller=require("../controllers/auth.controller")
 const identifyinguser=require("../middleware/auth.middleware")


authRouter.post("/register",register);

authRouter.post("/login",login );
authRouter.post("/get-me",identifyinguser,getuser)
module.exports = authRouter;
