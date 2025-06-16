import {
  accessTokenOptions,
  apiResponseHandler,
  asyncFuncHandler,
  Brand,
  checkValidEmail,
  checkValidPassword,
  error,
  Founder,
  generateAccessAndRefreshTokenforFounder,
  Referral,
  refreshTokenOptions,
  success,
} from '@gurukul/shared-server';
import { roles, statusCodes } from '../../../../config/constants.js';
import jwt from 'jsonwebtoken';
import env from '../../../../../../../env.js';

const loginFounder = asyncFuncHandler(async (req, res) => {
  //get the data from frontend
  const { email, password } = req?.body;
  const { brandId } = req?.params;
  if (!brandId) {
    return error(statusCodes.BAD_REQUEST, 'Brand ID is required')(res);
  }

  //sanitize data from frontend
  if (!email || !password) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  //check email format
  if (!checkValidEmail(email)) {
    return error(statusCodes.BAD_REQUEST, 'Invalid email format')(res);
  }
  //check password length and characters
  if (checkValidPassword(password).error) {
    return error(
      statusCodes.BAD_REQUEST,
      checkValidPassword(password).message
    )(res);
  }
  //check for existed founder
  const founder = await Founder.findOne({ email });
  if (!founder) {
    return error(
      statusCodes.NOT_FOUND,
      'Founder not found, please register'
    )(res);
  }
  //cehck if founder created this brand
  const founderBrand = await Brand.findOne({
    _id: brandId,
    established_by: founder._id,
  });
  if (!founderBrand) {
    return error(
      statusCodes.UNAUTHORIZED,
      'You are not authorized to access this brand'
    )(res);
  }

  //check password
  const isPasswordCorrect = await founder.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Incorrect password, please try again'
    )(res);
  }
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforFounder(founder._id);

  const hashedUserRole = await founder.hashUserRole();
  const loggedInFounder = await Founder.findById(founder._id).select(
    '-password'
  );

  let responseFounder = null;
  if (loggedInFounder) {
    responseFounder = {
      ...loggedInFounder.toObject(),
      role: 'founder',
    };
  }

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, refreshTokenOptions)
    .cookie('accessToken', accessToken, accessTokenOptions)
    .cookie('user_role', hashedUserRole, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
    })
    .json(
      new apiResponseHandler(
        200,
        'Founder logged in successfully',
        responseFounder
      )
    );
});

const createReferral = asyncFuncHandler(async (req, res) => {
  const role = req.role;
  if (role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to founder only'
    )(res);
  }
  const { minLength, maxLength } = req?.query;
  const { brandId } = req?.params;
  //create a unique code for referral
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length =
    Math.floor(Math.random() * (Number(maxLength) - Number(minLength) + 1)) +
    Number(minLength);
  let code = '';

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  //check if the code already exists in the database
  const existingCode = await Referral.find({ referral_code: code });
  if (existingCode.length !== 0) {
    return error(
      statusCodes.BAD_REQUEST,
      'Code already exists, please try again'
    )(res);
  }

  //now create a jwt and save it to the database
  const token = jwt.sign(
    { referral_code: code, brandId, founder_id: req.user._id },
    env.JWT_REFERRAL_TOKEN,
    { expiresIn: env.JWT_REFERRAL_TOKEN_EXPIRES_IN }
  );

  //save the code to the database
  const referral = await Referral.create({
    referral_code: code,
    founder_id: req.user._id,
    brand_id: brandId,
    token,
  });

  if (!referral) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create referral code for some unknown reason'
    )(res);
  }
  return success(
    statusCodes.CREATED,
    'Referral code created successfully',
    referral
  )(res);
});

const getReferralToken = asyncFuncHandler(async (req, res) => {
  const role = req.role;
  if (role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to founder only'
    )(res);
  }
  //get the referral token that is not used
  const existingCode = await Referral.find({ used: false }).select({
    token: 1,
  });

  if (existingCode.length === 0) {
    return error(
      statusCodes.NOT_FOUND,
      'No referral token found, please create a new one'
    )(res);
  }

  //send all the token to founder
  return success(
    statusCodes.OK,
    'Referral token found successfully',
    existingCode
  )(res);
});

const verifyReferralToken = asyncFuncHandler(async (req, res) => {
  const { token } = req?.body;
  const { brandId } = req?.params;
  if (!token) {
    return error(statusCodes.BAD_REQUEST, 'Token is required')(res);
  }
  try {
    const decoded = jwt.verify(token, env.JWT_REFERRAL_TOKEN);
    //check if the token is already used
    const existingCode = await Referral.findOne({
      referral_code: decoded.referral_code,
      used: false,
    });

    if (!existingCode) {
      return error(
        statusCodes.NOT_FOUND,
        'Referral token not found or already used'
      )(res);
    }
    //check if the brandId matches
    if (brandId !== decoded.brandId) {
      return error(
        statusCodes.UNAUTHORIZED,
        'This referral token does not belong to your brand'
      )(res);
    }
    //check if the founder_id matches
    if (existingCode.founder_id.toString() !== decoded.founder_id) {
      return error(
        statusCodes.UNAUTHORIZED,
        'This referral token does not belong to your account'
      )(res);
    }
    return success(
      statusCodes.OK,
      'Referral token is valid and marked as used',
      decoded
    )(res);
  } catch (err) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Invalid or expired referral token'
    )(res);
  }
});

const verifyToken = asyncFuncHandler(async (req, res) => {
  const accessToken = req?.cookies?.accessToken;
  if (!accessToken) {
    return error(
      statusCodes.UNAUTHORIZED,
      'No access token found in cookies, Kindly login again'
    )(res);
  }
  try {
    const decoded = jwt.verify(accessToken, env.JWT_ACCESS_TOKEN_SECRET);
    return success(statusCodes.OK, 'Token is valid', decoded)(res);
  } catch (err) {
    return error(statusCodes.UNAUTHORIZED, 'Invalid or expired token')(res);
  }
});

const verifyRole = asyncFuncHandler(async (req, res, next) => {
  const userRole = req?.cookies?.user_role;
  if (!userRole) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Founder role not found in cookies'
    )(res);
  }
  try {
    const decodedRole = jwt.verify(userRole, env.JWT_USER_ROLE_SECRET);
    return success(statusCodes.OK, 'Founder role is valid', decodedRole)(res);
  } catch (err) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Invalid or expired founder role'
    )(res);
  }
});

export {
  loginFounder,
  createReferral,
  getReferralToken,
  verifyReferralToken,
  verifyToken,
  verifyRole,
};
