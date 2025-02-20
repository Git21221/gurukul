import {
  accessTokenOptions,
  apiErrorHandler,
  apiResponseHandler,
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  Founder,
  generateAccessAndRefreshTokenforFounder,
  refreshTokenOptions,
} from "@gurukul/shared-server";

const registerFounder = asyncFuncHandler(async (req, res) => {
  const { email, fullName, password } = req?.body;
  //sanitize data from frontend
  if (!email || !fullName || !password) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Missing required fields"));
  }
  //check email format
  if (!checkValidEmail(email)) {
    return res.status(400).json(new apiErrorHandler(400, "Invalid email"));
  }
  //check password length and characters
  if (checkValidPassword(password).error) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, checkValidPassword(password).message));
  }

  //check for existed founder
  const existedFounder = await Founder.find({ email }, { new: true });
  if (existedFounder.length !== 0) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Founder already exists"));
  }

  //create new founder
  const founder = await Founder.create({ email, fullName, password });

  if (!founder) {
    return res
      .status(500)
      .json(
        new apiErrorHandler(
          500,
          "Failed to create founder for some unknown reason"
        )
      );
  }

  return res
    .status(201)
    .json(new apiResponseHandler(201, "Founder created successfully"));
});

const loginFounder = asyncFuncHandler(async (req, res) => {
  const { email, password } = req?.body;
  console.log(email, password);
  
  //sanitize data from frontend
  if (!email || !password) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Missing required fields"));
  }
  //check email format
  if (!checkValidEmail(email)) {
    return res.status(400).json(new apiErrorHandler(400, "Invalid email"));
  }
  //check for existed founder
  const founder = await Founder.findOne({ email });
  if (!founder) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Founder does not exist"));
  }
console.log(founder);

  //check password
  const isPasswordCorrect = await founder.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(400).json(new apiErrorHandler(400, "Invalid password"));
  }
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforFounder(founder._id);

  const loggedInFounder = await Founder.findById(founder._id).select(
    "-password"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .json(
      new apiResponseHandler(
        200,
        "Founder logged in successfully",
        loggedInFounder
      )
    );
});

export { registerFounder, loginFounder };
