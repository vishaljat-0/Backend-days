const express = require("express");
const postRouter = express.Router();
const { createpost , getpostcontroller,getpostdetailscontroller} = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {register,login} = require("../controllers/auth.controller");
// const postcontroller=require("../controllers/post.controller")
// const getpostcontroller=require("../controllers/post.controller")




postRouter.post("/",upload.single("imageUrl"), createpost);
postRouter.get("/", getpostcontroller)
postRouter.get("/details/:id", getpostcontroller,getpostdetailscontroller)


module.exports = postRouter;
