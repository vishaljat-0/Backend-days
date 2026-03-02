const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const blacklistmodel = require("../models/blacklist.model");
const register = async (req, res) => {
  const { username, email, password } = req.body;
  isalreadyexist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (isalreadyexist) {
    return res.status(400).json({ message: "User already exist" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,

    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token, { httpOnly: true });

  return res.status(201).json({
    message: "User registered successfully",
    token,
    user,
  });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ email }, { username }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const ispasswordvalid = await bcrypt.compare(password, user.password);
  if (!ispasswordvalid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,

    {
      expiresIn: "3d",
    },
  );
  res.cookie("token", token, { httpOnly: true });

  return res.status(200).json({
    message: "User logged in successfully",
    token,
    user,
  });
};

const getme = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};

const logoutcontroller = async (req, res) => {
  const token = req.cookies.token;
  blacklistmodel.create({token})

    res.clearCookie("token")
  return res.status(200).json({ message: "User logged out successfully" });
};
module.exports = {
  register,
  login,
  getme,
  logoutcontroller
};
