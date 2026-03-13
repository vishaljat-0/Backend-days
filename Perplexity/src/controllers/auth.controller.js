import userModel from "../models/user.model.js";

export const registerController = async (req, res, next) => {
  const { username, email, password } = req.body || {};

  const isUserexist = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserexist) {
    const err = new Error("User already exist with this email or username");
    err.status = 400;
    return next(err);
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  res.status(201).json({
    message: "User registered successfuly",
  });
};
