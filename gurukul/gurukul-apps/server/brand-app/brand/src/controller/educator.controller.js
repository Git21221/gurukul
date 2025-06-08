import {
  accessTokenOptions,
  apiResponseHandler,
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  Educator,
  generateAccessAndRefreshTokenforEducator,
  Referral,
  refreshTokenOptions,
} from '@gurukul/shared-server';
import jwt from 'jsonwebtoken';
import env from '../../../../../../../env.js';
import { statusCodes } from '../../../../config/constants.js';
import {
  error,
  success,
} from '@gurukul/shared-server/utils/formattedReturns.js';
import mongoose from 'mongoose';

const registerEducator = asyncFuncHandler(async (req, res) => {
  const { email, fullName, password } = req?.body;
  const { token } = req?.query;
  //sanitize data from frontend
  if (!email || !fullName || !password) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  //check token
  if (!token) {
    return error(statusCodes.BAD_REQUEST, 'Missing token in query params')(res);
  }
  //check email format
  if (!checkValidEmail(email)) {
    return error(statusCodes.BAD_REQUEST, 'Invalid email')(res);
  }
  //check password length and characters
  if (checkValidPassword(password).error) {
    return error(
      statusCodes.BAD_REQUEST,
      checkValidPassword(password).message
    )(res);
  }

  //check for existed educator
  const existedEducator = await Educator.find({ email }, { new: true });
  if (existedEducator.length !== 0) {
    return error(statusCodes.BAD_REQUEST, 'Educator already exists')(res);
  }

  //check token validity
  const tokenData = jwt.verify(token, env.JWT_REFERRAL_TOKEN);
  const referral = await Referral.find({
    referral_code: tokenData.referral_code,
  }).select({ _id: 1, referral_code: 1, founder_id: 1, brand_id: 1 });
  if (referral.length === 0) {
    return error(statusCodes.BAD_REQUEST, 'Invalid token')(res);
  }
  //check if token is already used
  const usedReferral = await Referral.find({ token });
  if (usedReferral[0].used) {
    return error(statusCodes.BAD_REQUEST, 'Token already used')(res);
  }

  //create new educator
  const educator = await Educator.create({
    emailId: email,
    fullName,
    password,
    referral: referral[0]._id,
    belongs_to_brand: referral[0].brand_id,
  });

  //update referral to used
  const updatedReferral = await Referral.findByIdAndUpdate(
    referral[0]._id,
    {
      used: true,
      used_by_educator: educator._id,
    },
    { new: true }
  );
  if (!updatedReferral) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update referral code to used'
    )(res);
  }

  if (!educator) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create educator for some unknown reason'
    )(res);
  }

  return success(statusCodes.CREATED, 'Educator created successfully')(res);
});

const loginEducator = asyncFuncHandler(async (req, res) => {
  const { email, password } = req?.body;
  const { brandId } = req?.params;
  const isAuthorisedInBrand = await Educator.findOne(
    { email, belongs_to_brand: new mongoose.Types.ObjectId(brandId) },
    { new: true }
  );
  if (!isAuthorisedInBrand) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, you are not associated with this brand'
    )(res);
  }
  //sanitize data from frontend
  if (!email || !password) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  // check email format
  if (!checkValidEmail(email)) {
    return error(statusCodes.BAD_REQUEST, 'Invalid email')(res);
  }
  //check password length and characters
  if (checkValidPassword(password).error) {
    return error(
      statusCodes.BAD_REQUEST,
      checkValidPassword(password).message
    )(res);
  }
  //check for existed educator
  const educator = await Educator.findOne({ email });
  if (!educator) {
    return error(statusCodes.BAD_REQUEST, 'Educator does not exist')(res);
  }
  //check password
  const isPasswordCorrect = await educator.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return error(statusCodes.BAD_REQUEST, 'Incorrect password')(res);
  }

  //create token
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforEducator(educator._id);
  const hashedUserRole = await educator.hashUserRole();
  const loggedInEducator = await Educator.findById(educator._id).select(
    '-password'
  );

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, refreshTokenOptions)
    .cookie('accessToken', accessToken, accessTokenOptions)
    .cookie('user_role', hashedUserRole, {
      maxAge: 1 * 30 * 24 * 60 * 60 * 1000, //1 month validity
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    .json(
      new apiResponseHandler(
        200,
        'Educator logged in successfully',
        loggedInEducator
      )
    );
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
      'User role not found in cookies'
    )(res);
  }
  try {
    const decodedRole = jwt.verify(userRole, env.JWT_USER_ROLE_SECRET);
    return success(statusCodes.OK, 'User role is valid', decodedRole)(res);
  } catch (err) {
    return error(statusCodes.UNAUTHORIZED, 'Invalid or expired user role')(res);
  }
});

export { registerEducator, loginEducator, verifyToken, verifyRole };
