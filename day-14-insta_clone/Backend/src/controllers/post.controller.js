const postmodel = require("../models/post.model");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("imagekit");
const likemodel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.PRIVITE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  urlEndpoint: process.env.URL,
});

let createpost = async (req, res) => {
  const id = req.user.id;
  const file = await imagekit.upload({
    file: req.file.buffer,
    fileName: "test",
    folder: "insta_clone",
  });

  const post = await postmodel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: id,
  });
  res.status(201).json({
    message: "post created successfully",
    post,
  });
};

let getpostcontroller = async (req, res) => {
  const userid = req.user.id;
  const post = await postmodel.find({
    user: userid,
  });

  res.status(201).json({
    message: "post fecthed successfully",
    post,
  });
};

let getpostdetailscontroller = async (req, res) => {
  const id = req.user.id;
  const postid = req.params.postId;

  const post = await postmodel.findById(postid);
  if (!post)
    return res.status(404).json({
      message: "post not found",
    });
  const user = await usermodel.findById(post.user);

  const isvaliduser = post.user.toString() === id;
  if (!isvaliduser)
    return res.status(403).json({
      message: "forbidden content",
    });

  return res.status(200).json({
    message: "post detaled  fecthed successfully",
    post,
    user,
  });
};

let likecontroller = async (req, res) => {
  const username = req.user.username;
  const postid = req.params.postId;

  const post = await postmodel.findById(postid);
  if (!post)
    return res.status(404).json({
      message: "post not found",
    });
  const like = await likemodel.create({
    post: postid,
    user: username,
  });

  return res.status(201).json({
    message: "post liked successfully",
    like,
  });
};

let getfeedcontoller = async (req, res) => {
  const user = req.user
  const posts =  await Promise.all ((await postmodel.find().populate("user").lean()).map(async(post) => {
    const isliked= await likemodel.findOne({
      user:user._id,
      post:post._id
    })
     post.isliked=Boolean(isliked)
    return post
  }))
  

  res.status(200).json({
    message: "posts fetched successfully",
    posts,
  });
};
module.exports = {
  createpost,
  getpostcontroller,
  getpostdetailscontroller,
  likecontroller,
  getfeedcontoller
};
