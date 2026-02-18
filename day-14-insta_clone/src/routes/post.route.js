const express = require("express");
const postRouter = express.Router();
const {
  createpost,
  getpostcontroller,
  getpostdetailscontroller,
  likecontroller,
} = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { register, login } = require("../controllers/auth.controller");
const identifyinguser = require("../middleware/auth.middleware");
// const postcontroller=require("../controllers/post.controller")
// const getpostcontroller=require("../controllers/post.controller")

/*
@routes post /api/posts/ [protected]
@description create a post with image 
*/
postRouter.post("/", identifyinguser, upload.single("imageUrl"), createpost);
/*
@routes get /api/posts/ [protected]
@description get posts
*/
postRouter.get("/", identifyinguser, getpostcontroller);

/*
@routes get /api/posts/:details [protected]
*/
postRouter.get(
  "/details/:id",
  identifyinguser,
  getpostcontroller,
  getpostdetailscontroller,
);
//like
postRouter.post("/like/:postId", identifyinguser, likecontroller);






module.exports = postRouter;
