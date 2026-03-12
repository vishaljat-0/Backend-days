import dotenv from "dotenv";
dotenv.config();

const errormiddleware = (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;

  res.status(status).json({
    message: err.message || "Internal Server Error"
  });
};

export default errormiddleware;
