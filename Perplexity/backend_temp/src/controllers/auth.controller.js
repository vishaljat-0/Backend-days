import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
import { verificationEmailTemplate } from "../services/mail.template.js";

export const registerController = async (req, res, next) => {
  try {
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
    const emailverification = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
    );
const verificationLink =
  `${process.env.BASE_URL}/api/auth/verifyemail?token=${emailverification}`;
    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity!",
      html:verificationEmailTemplate(verificationLink)
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logincontroller = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    const passwordmacth = await user.camparePassword(password);

    if (!passwordmacth) {
      const err = new Error("Invalid password");
      err.status = 404;
      return next(err);
    }

    if (!user.verified) {
      const err = new Error("User not verified");
      err.status = 404;
      return next(err);
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    res.cookie("token", token);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getmecontroller = async (req, res, next) => {
  const id = req.user.id;

  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: "User fecthed  successfully",
      user,
    });
  } catch (error) {}
};

export const emailverificationController = async (req, res, next) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    console.log(user);
    user.verified = true;
    await user.save();

res.redirect(`${process.env.FRONTEND_URL}/email-verified`);
  } catch (error) {
    next(error);
  }
};

export const logoutcontoller = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
