import {
  accessTokenOptions,
  apiResponseHandler,
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  error,
  generateAccessAndRefreshTokenforUser,
  refreshTokenOptions,
  success,
  User,
} from '@gurukul/shared-server';
import { statusCodes } from '../../../../config/constants.js';
import jwt from 'jsonwebtoken';
import env from '../../../../../../../env.js';

const registerUser = asyncFuncHandler(async (req, res) => {
  const ip = req.ip;
  const { email, fullName, password } = req.body;
  console.log(email, fullName, password);

  const { brandId } = req.params;
  if (!ip) {
    return error(statusCodes.BAD_REQUEST, 'IP address is required')(res);
  }
  if (!email || !fullName || !password) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  if (!brandId) {
    return error(statusCodes.BAD_REQUEST, 'Brand ID is required')(res);
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
  //check if user already exists
  const existingUser = await User.find({
    emailId: email,
    platform_of_account: brandId,
  });
  if (existingUser.length !== 0) {
    return error(statusCodes.BAD_REQUEST, 'User already exists')(res);
  }

  //create new user
  const user = await User.create({
    emailId: email,
    fullName,
    password,
    ipv4_address: ip,
    platform_of_account: brandId,
  });
  if (!user) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create user'
    )(res);
  }
  return success(statusCodes.CREATED, 'User created successfully', user)(res);
});

const loginUser = asyncFuncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { brandId } = req.params;

  if (!email || !password) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  if (!brandId) {
    return error(statusCodes.BAD_REQUEST, 'Brand ID is required')(res);
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

  //find user
  const user = await User.findOne({
    emailId: email,
    platform_of_account: brandId,
  });
  if (!user) {
    return error(statusCodes.NOT_FOUND, 'User not found')(res);
  }

  //check password
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return error(statusCodes.BAD_REQUEST, 'Incorrect password')(res);
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforUser(user._id);

  const hashedUserRole = await user.hashUserRole();
  const loggedInUser = await User.findById(user._id).select('-password');

  return res
    .status(statusCodes.OK)
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
        statusCodes.OK,
        'User logged in successfully',
        loggedInUser
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

const verifyRole = asyncFuncHandler(async (req, res) => {
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

export { registerUser, loginUser, verifyToken, verifyRole };
