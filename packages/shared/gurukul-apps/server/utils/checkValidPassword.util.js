export const checkValidPassword = (password) => {
  if (password.length < 8) {
    return {
      error: true,
      message: "Password must be at least 8 characters long",
    };
  }
  if (password.length > 24) {
    return {
      error: true,
      message: "Password must be at most 24 characters long",
    };
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return {
      error: passwordRegex.test(password) ? false : true,
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    };
};
