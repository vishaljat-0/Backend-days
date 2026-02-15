const postmodel = require("../models/post.model");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("imagekit");




const imagekit= new ImageKit({
    privateKey:process.env.PRIVITE_KEY,
    publicKey:process.env.PUBLIC_KEY,
    urlEndpoint:process.env.URL
   
})

let createpost = async (req, res) => {
  const { caption, imageUrl, user } = req.body;

  const file = await imagekit.upload({
    file:req.file.buffer,
    fileName:"test"
  })
  res.send(file)

  console.log(req.body,req.file);
};
module.exports = {
  createpost,
};
