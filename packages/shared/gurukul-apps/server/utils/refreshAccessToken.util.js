import { Educator } from '../models/educator.model.js';
import { Founder } from '../models/founder.model.js';
import { Mentor } from '../models/mentor.model.js';
import { User } from '../models/user.model.js';
import {
  generateAccessAndRefreshTokenforEducator,
  generateAccessAndRefreshTokenforFounder,
  generateAccessAndRefreshTokenforMentor,
  generateAccessAndRefreshTokenforUser,
} from './generateAccessRefreshToken.util.js';

export const accessTokenOptions = {
  maxAge: 24 * 60 * 60 * 1000, // 1 day validity
  httpOnly: false,
  secure: true,
  sameSite: 'None',
  path: '/',
};
export const refreshTokenOptions = {
  maxAge: 1 * 30 * 24 * 60 * 60 * 1000, //1 month validity
  httpOnly: false,
  secure: true,
  sameSite: 'None',
  path: '/',
};

const refreshAccessTokenForFounder = async (req, res) => {
  const incomingRefreshToken = req?.cookies?.refreshToken;
  if (!incomingRefreshToken)
    return res
      .status(401)
      .json({ message: 'Unauthorized access, please login again' });
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  const userId = decodedToken._id;
  const user = await Founder.findById(userId);
  if (!user)
    return res
      .status(401)
      .json({ message: 'Id do not match, please login again' });
  if (incomingRefreshToken !== user.refreshToken)
    return res
      .status(401)
      .json({ message: "Invalid refresh token, doesn't match with user" });
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforFounder(userId);
  res.cookie('accessToken', accessToken, accessTokenOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenOptions);
  return { accessToken, refreshToken };
};

const refreshAccessTokenForEducator = async (req, res) => {
  const incomingRefreshToken = req?.cookies?.refreshToken;
  if (!incomingRefreshToken)
    return res
      .status(401)
      .json({ message: 'Unauthorized access, please login again' });
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  const userId = decodedToken._id;
  const user = await Educator.findById(userId);
  if (!user)
    return res
      .status(401)
      .json({ message: 'Id do not match, please login again' });
  if (incomingRefreshToken !== user.refreshToken)
    return res
      .status(401)
      .json({ message: "Invalid refresh token, doesn't match with user" });
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforEducator(userId);
  res.cookie('accessToken', accessToken, accessTokenOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenOptions);
  return { accessToken, refreshToken };
};

const refreshAccessTokenForMentor = async (req, res) => {
  const incomingRefreshToken = req?.cookies?.refreshToken;
  if (!incomingRefreshToken)
    return res
      .status(401)
      .json({ message: 'Unauthorized access, please login again' });
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  const userId = decodedToken._id;
  const user = await Mentor.findById(userId);
  if (!user)
    return res
      .status(401)
      .json({ message: 'Id do not match, please login again' });
  if (incomingRefreshToken !== user.refreshToken)
    return res
      .status(401)
      .json({ message: "Invalid refresh token, doesn't match with user" });
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforMentor(userId);
  res.cookie('accessToken', accessToken, accessTokenOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenOptions);
  return { accessToken, refreshToken };
};

const refreshAccessTokenForUser = async (req, res) => {
  const incomingRefreshToken = req?.cookies?.refreshToken;
  if (!incomingRefreshToken)
    return res
      .status(401)
      .json({ message: 'Unauthorized access, please login again' });
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );
  const userId = decodedToken._id;
  const user = await User.findById(userId);
  if (!user)
    return res
      .status(401)
      .json({ message: 'Id do not match, please login again' });
  if (incomingRefreshToken !== user.refreshToken)
    return res
      .status(401)
      .json({ message: "Invalid refresh token, doesn't match with user" });
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokenforUser(userId);
  res.cookie('accessToken', accessToken, accessTokenOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenOptions);
  return { accessToken, refreshToken };
};

export {
  refreshAccessTokenForFounder,
  refreshAccessTokenForEducator,
  refreshAccessTokenForMentor,
  refreshAccessTokenForUser,
};
