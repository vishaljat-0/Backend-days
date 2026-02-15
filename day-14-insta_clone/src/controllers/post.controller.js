const postmodel = require("../models/post.model");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("imagekit");
let decoded=null

const imagekit = new ImageKit({
  privateKey: process.env.PRIVITE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  urlEndpoint: process.env.URL,
});

let createpost = async (req, res) => {
  const { caption } = req.body;

  const file = await imagekit.upload({
    file: req.file.buffer,
    fileName: "test",
    folder: "insta_clone",
  });

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }
  try {
     decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  const post = await postmodel.create({
    caption: caption,
    imageUrl: file.url,
    user: decoded.id,
  });
  res.status(201).json({
    message: "post created successfully",
    post,
  });
};

module.exports = {
  createpost,
};
