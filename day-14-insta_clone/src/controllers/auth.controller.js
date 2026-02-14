const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");
const crypto = require("crypto");

async function register(req, res) {
  const { username, email, password, bio, profilePic } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isuserexsits = await usermodel.findOne({
    $or: [{ email }, { username }],
  });
  if (isuserexsits) {
    return res.status(400).json({
      message:
        "user already exsits" +
        (isuserexsits.email == email
          ? "email already exsits"
          : "username already exsits"),
    });
  }

  const user = await usermodel.create({
    username,
    email,
    password: hash,
    bio,
    profilePic,
  });
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("toke", token);

  res.status(201).json({
    message: "user created successfully",
    user,
    token,
  });
}

async function login(req, res) {
  const { username, email, password } = req.body;
  const user = await usermodel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const ispasswordvalid = hash == user.password;
  if (!ispasswordvalid) {
    return res.status(401).json({
      message: "password is incorrect",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully",
    user,
    token,
  });
}


module.exports = {
  register,
  login,
};