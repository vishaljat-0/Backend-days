 import jwt from "jsonwebtoken";
 
 export const authmiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }
};
