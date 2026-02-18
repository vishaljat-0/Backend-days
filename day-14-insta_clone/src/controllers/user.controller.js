const { json } = require("express");
const followmodel = require("../models/follow.model");
const usermodel = require("../models/user.model");
async function followusercontroller(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;
  if (follower === followee) {
    return res.status(400).json({
      message: "you can't follow yourself",
    });
  }
  const isfolloweeexist = await usermodel.findOne({
    username: followee,
  });
  const alreadyfollow = await followmodel.findOne({
    follower,
    followee,
    // status:"pending"
  });

  if (alreadyfollow) {
    return res.status(200).json({
      message: `${follower} already followed ${followee}`,
    });
  }
  if (!isfolloweeexist) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const followrecord = await followmodel.create({
    follower: follower,
    followee: followee,
    
  });
  return res.status(201).json({
    message: ` request sent successfully`,
    followrecord,
  });
}

async function acceptfollowcontroller(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;
  const request = await followmodel.findOne({
    follower,
    followee,
    status: "pending",
  });

  if (!request) {
    return res.status(200).json({
      message: "you don't have any pending request",
    });
  }

  const accept = await followmodel.findByIdAndUpdate(
    request._id,
    {
      status: "accepted",
    },
    {
      new: true,
    },
  );
  return res.status(200).json({
    message: `${follower} accepted ${followee} successfully`,
    request,
  });
}

async function rejectfollowcontroller(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;
  const request = await followmodel.findOne({
    follower,
    followee,
    status: "pending",
  });

  if (!request) {
    return res.status(404).json({
      message: "you don't have any pending request",
    });
  }

  if (request.status === "rejected") {
    return res.status(200).json({
      message: `${follower} already rejected ${followee}`,
    });
  }
    const deletedocument = await followmodel.findByIdAndDelete(request._id);
  const accept = await followmodel.findByIdAndUpdate(
    request._id,
    {
      status: "rejected",
    },
    {
      new: true,
    },
  );
  return res.status(200).json({
    message: `${follower} rejected   ${followee} successfully`,
  });
}
async function unfollowcontroller(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;

  const isuserfollow = await followmodel.findOne({
    follower: follower,
    followee: followee,
  });

  if (!isuserfollow) {
    return res.status(200).json({
      message: `you are not follow ${followee}`,
    });
  }
  await followmodel.findByIdAndDelete(isuserfollow._id);
  return res.status(200).json({
    message: `${follower} unfollowed ${followee} successfully`,
  });
}

module.exports = {
  followusercontroller,
  unfollowcontroller,
  acceptfollowcontroller,
  rejectfollowcontroller,
};
