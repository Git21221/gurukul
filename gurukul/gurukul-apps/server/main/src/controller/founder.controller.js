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
import { roles, statusCodes } from "../../../config/constants.js";
import {
  error,
  success,
} from "@gurukul/shared-server/utils/formattedReturns.js";

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
  //get the data from frontend
  const { email, password } = req?.body;
  console.log(email, password);

  //sanitize data from frontend
  if (!email || !password) {
    return error(statusCodes.BAD_REQUEST, "Missing required fields")(res);
  }
  //check email format
  if (!checkValidEmail(email)) {
    return error(statusCodes.BAD_REQUEST, "Invalid email format")(res);
  }
  //check for existed founder
  const founder = await Founder.findOne({ email });
  if (!founder) {
    return error(
      statusCodes.NOT_FOUND,
      "Founder not found, please register"
    )(res);
  }

  //check password
  const isPasswordCorrect = await founder.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Incorrect password, please try again"
    )(res);
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
  if (role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, restricted to founder only"
    )(res);
  }
  const { minLength, maxLength } = req?.query;
  const { brand_id } = req?.params;
  //create a unique code for referral
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length =
    Math.floor(Math.random() * (Number(maxLength) - Number(minLength) + 1)) +
    Number(minLength);
  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  //check if the code already exists in the database
  const existingCode = await Referral.find({ referral_code: code });
  if (existingCode.length !== 0) {
    return error(
      statusCodes.BAD_REQUEST,
      "Code already exists, please try again"
    )(res);
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
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create referral code for some unknown reason"
    )(res);
  }
  return success(
    statusCodes.CREATED,
    "Referral code created successfully",
    referral
  )(res);
});

const getReferralToken = asyncFuncHandler(async (req, res) => {
  const role = req.role;
  if (role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, restricted to founder only"
    )(res);
  }
  //get the referral token that is not used
  const existingCode = await Referral.find({ used: false }).select({
    token: 1,
  });

  if (existingCode.length === 0) {
    return error(
      statusCodes.NOT_FOUND,
      "No referral token found, please create a new one"
    )(res);
  }

  //send all the token to founder
  return success(
    statusCodes.OK,
    "Referral token found successfully",
    existingCode
  )(res);
});

export { registerFounder, loginFounder, createReferral, getReferralToken };
