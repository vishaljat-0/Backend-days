const express = require("express");
const userRouter = express.Router();
const { followusercontroller,unfollowcontroller,acceptfollowcontroller,rejectfollowcontroller } = require("../controllers/user.controller");
const identifyinguser  = require("../middleware/auth.middleware");

userRouter.post("/follow/:username", identifyinguser, followusercontroller);
userRouter.post("/unfollow/:username", identifyinguser, unfollowcontroller);
userRouter.put("/follow/:username/accept", identifyinguser,acceptfollowcontroller )
userRouter.put("/follow/:username/reject", identifyinguser,rejectfollowcontroller )




module.exports = userRouter;
