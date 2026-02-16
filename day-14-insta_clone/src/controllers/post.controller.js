const postmodel = require("../models/post.model");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("imagekit");
let decoded = null;

const imagekit = new ImageKit({
  privateKey: process.env.PRIVITE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  urlEndpoint: process.env.URL,
});

let createpost = async (req, res) => {
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
    caption: req.body.caption,
    imageUrl: file.url,
    user: decoded.id,
  });
  res.status(201).json({
    message: "post created successfully",
    post,
  });
};

let getpostcontroller = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }

  const userid = decoded.id;
  const post = await postmodel.find({
    user: userid,
  });

  res.status(201).json({
    message: "post fecthed successfully",
    post,
  });
};

let getpostdetailscontroller = async () => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      message: "unauthorized access",
    });
  }
const id = decoded.id
const postid = req.params.postId



const post=await postmodel.findById(postid)
if(!post)
  res.status(404).json({
    message:"post not found"
  })
const user=await usermodel.findById(post.user)


const isvaliduser = post.user.toString()===id
if(!isvaliduser)
  return res.status(403).json({
    message:"forbidden content"
  })


res.status(201).json({
  message:"post detaled  fecthed successfully",
  post,
  user
})

};

module.exports = {
  createpost,
  getpostcontroller,
  getpostdetailscontroller
};
