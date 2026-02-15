const express = require("express");
const postRouter = express.Router();
const { createpost } = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });




postRouter.post("/",upload.single("imageUrl"), createpost);

module.exports = postRouter;
