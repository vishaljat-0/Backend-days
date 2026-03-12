export const registercontroller = (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    res.status(201).json({
      message: "User created successfully",

      username,
      email,
      password,
    });
  } catch (error) {
    error.status = 400;
    error.message = "Something went wrong";

    next(error);
  }
};
