const express = require("express");
const authRouter = express.Router();
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userexist = await usermodel.findOne({ email });
  if (userexist) {
    return res.status(409).json({
      message: "user already exist",
    });
  }
  const user = await usermodel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id:user._id,
      email: user.email
    },

    process.env.SECRET_KEY,
  );
  res.cookie("jwt",token)

  res.status(201).json({
    message: "user created",
    user,token
  });
});

module.exports = authRouter;
