export const registercontroller = (req, res, next) => {
  try {
    console.log(user);

  } catch (error) {
    error.status = 400;
    error.message = "Something went wrong";

    next(error);
  }
};
