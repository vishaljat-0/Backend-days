import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  res.status(400).json({
    error: error.array(),
  });
};

export const registervalidation = [
body("username")
  .notEmpty()
  .withMessage("Username is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate,
];
