const express = require("express");
const authRouter = express.Router();
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userexist = await usermodel.findOne({ email });
  if (userexist) {
    return res.status(409).json({
      message: "user already exist",
    });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex")
  const user = await usermodel.create({
    name,
    email,
    password:hash
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },

    process.env.SECRET_KEY,
  );
  res.cookie("jwt", token);

  res.status(201).json({
    message: "user created",
    user,
    token,
  });
});
authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(201).json({
    message: "protected route",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  if (user.password !== crypto.createHash("md5").update(password).digest("hex")) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY,
  );
  res.cookie(
    "jwt",
    token,
    res.status(200).json({
      message: "login successful",
      user,
      token,
    }),
  );
});

module.exports = authRouter;
