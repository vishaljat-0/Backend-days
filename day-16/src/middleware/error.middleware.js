import dotenv from "dotenv";
dotenv.config();

const errormiddleware = (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;

  res.status(status).json({
    message: err.message || "Internal Server Error",
    stack:process.env.project_face === "Development"? err.stack : undefined
  });
};

export default errormiddleware;
