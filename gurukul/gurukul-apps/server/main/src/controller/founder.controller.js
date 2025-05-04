import {
  accessTokenOptions,
  apiErrorHandler,
  apiResponseHandler,
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  Founder,
  generateAccessAndRefreshTokenforFounder,
  Referral,
  refreshTokenOptions,
} from "@gurukul/shared-server";
import jwt from "jsonwebtoken";
import env from "../../../../../../env.js";

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
  const role = req.role;
  if (role !== "founder") {
    return res
      .status(403)
      .json(
        new apiErrorHandler(
          403,
          "Unauthorized access, restricted to founder only"
        )
      );
  }
  //get the data from frontend
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

  const hashedUserRole = await founder.hashUserRole();
  const loggedInFounder = await Founder.findById(founder._id).select(
    "-password"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("user_role", hashedUserRole, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
    })
    .json(
      new apiResponseHandler(
        200,
        "Founder logged in successfully",
        loggedInFounder
      )
    );
});

const createReferral = asyncFuncHandler(async (req, res) => {
  const role = req.role;
  if (role !== "founder") {
    return res
      .status(403)
      .json(
        new apiErrorHandler(
          403,
          "Unauthorized access, restricted to founder only"
        )
      );
  }
  const { minLength, maxLength } = req?.query;
  const { brand_id } = req?.params;
  //create a unique code for referral
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length =
    Math.floor(Math.random() * (Number(maxLength) - Number(minLength) + 1)) + Number(minLength);
  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  //check if the code already exists in the database
  const existingCode = await Referral.find({ referral_code: code });
  if (existingCode.length !== 0) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Code already exists"));
  }

  //now create a jwt and save it to the database
  const token = jwt.sign(
    { referral_code: code, brand_id, founder_id: req.user._id },
    env.JWT_REFERRAL_TOKEN,
    { expiresIn: env.JWT_REFERRAL_TOKEN_EXPIRES_IN }
  );

  //save the code to the database
  const referral = await Referral.create({
    referral_code: code,
    founder_id: req.user._id,
    brand_id,
    token,
  });

  if (!referral) {
    return res
      .status(500)
      .json(new apiErrorHandler(500, "Failed to create referral code"));
  }
  return res
    .status(201)
    .json(
      new apiResponseHandler(201, "Referral code created successfully", token)
    );
});

const getReferralToken = asyncFuncHandler(async (req, res) => {
  const role = req.role;
  if (role !== "founder") {
    return res
      .status(403)
      .json(
        new apiErrorHandler(
          403,
          "Unauthorized access, restricted to founder only"
        )
      );
  }
  //get the referral token that is not used
  const existingCode = await Referral.find({ used: false }).select({
    token: 1,
  });

  if (existingCode.length === 0) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "No referral code available, create one"));
  }

  //send all the token to founder
  return res.status(200).json(existingCode);
});

export { registerFounder, loginFounder, createReferral, getReferralToken };
