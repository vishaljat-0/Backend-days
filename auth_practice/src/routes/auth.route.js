const express = require("express");
const authrouter = express.Router();
const usermodel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

authrouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userexist = await usermodel.findOne({ email });

  if (userexist) {
    return res.status(400).json({ message: "acount already exist" });
  }
  const user = await usermodel.create({
    name,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("jwt", token);

  res.json({ name, email, token });
});

authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await usermodel.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (hash !== user.password) {
    return res.status(401).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("jwt", token);
  res.json({
    message: "login successful",
    name: user.name,
    email: user.email,
    token,
  });
});
module.exports = authrouter;
