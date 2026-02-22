
const jwt = require("jsonwebtoken");
let identifyinguser = async (req, res, next) => {
      const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
          message: "unauthorized access",
        });
      }
      let decoded = null;
      try {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
      } catch (error) {
        return res.status(401).json({
          message: "unauthorized access",
        });
      }
    
      req.user = decoded;
      next();
    
}

module.exports =identifyinguser