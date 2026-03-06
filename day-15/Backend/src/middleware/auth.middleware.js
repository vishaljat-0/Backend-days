const jwt = require("jsonwebtoken");
const blacklistmodel = require("../models/blacklist.model");
const redis = require("../config/cache.js");

const userauth = async (req, res, next) => {
  const token = req.cookies.token;
  const blacklistedtoken = await redis.get(token);

  if (blacklistedtoken) {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  next();
};
module.exports = { userauth };
