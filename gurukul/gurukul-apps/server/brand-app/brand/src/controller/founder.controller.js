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
  refreshTokenOptions,
  success,
} from '@gurukul/shared-server';
import { statusCodes } from '../../../../config/constants.js';
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
  const founderBrand = await Brand.findOne({ established_by: founder._id });
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
        loggedInFounder
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

export { loginFounder, verifyToken, verifyRole };
