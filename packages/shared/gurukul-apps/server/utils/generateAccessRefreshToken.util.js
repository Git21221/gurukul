import { Educator } from '../models/educator.model.js';
import { Founder } from '../models/founder.model.js';
import { Mentor } from '../models/mentor.model.js';
import { User } from '../models/user.model.js';
import { apiErrorHandler } from './apiErrorHandler.util.js';

const generateAccessAndRefreshTokenforFounder = async (id) => {
  try {
    const founder = await Founder.findById(id);
    const accessToken = await founder.generateAccessToken();
    const refreshToken = await founder.generateRefreshToken();
    if (!accessToken || !refreshToken)
      throw new apiErrorHandler(
        400,
        'Error in generating refresh or access Token for founder'
      );

    founder.refreshToken = refreshToken;
    await founder.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiErrorHandler(
      400,
      'Internal error while generating access and refresh token!'
    );
  }
};

const generateAccessAndRefreshTokenforEducator = async (id) => {
  try {
    const educator = await Educator.findById(id);
    const accessToken = await educator.generateAccessToken();
    const refreshToken = await educator.generateRefreshToken();
    if (!accessToken || !refreshToken)
      throw new apiErrorHandler(
        400,
        'Error in generating refresh or access Token for educator'
      );

    educator.refreshToken = refreshToken;
    await educator.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiErrorHandler(
      400,
      'Internal error while generating access and refresh token!'
    );
  }
};

const generateAccessAndRefreshTokenforMentor = async (id) => {
  try {
    const mentor = await Mentor.findById(id);
    const accessToken = await mentor.generateAccessToken();
    const refreshToken = await mentor.generateRefreshToken();
    if (!accessToken || !refreshToken)
      throw new apiErrorHandler(
        400,
        'Error in generating refresh or access Token for mentor'
      );

    mentor.refreshToken = refreshToken;
    await mentor.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiErrorHandler(
      400,
      'Internal error while generating access and refresh token!'
    );
  }
};

const generateAccessAndRefreshTokenforUser = async (id) => {
  try {
    const user = await User.findById(id);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    if (!accessToken || !refreshToken)
      throw new apiErrorHandler(
        400,
        'Error in generating refresh or access Token for user'
      );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiErrorHandler(
      400,
      'Internal error while generating access and refresh token!'
    );
  }
};

export {
  generateAccessAndRefreshTokenforFounder,
  generateAccessAndRefreshTokenforEducator,
  generateAccessAndRefreshTokenforMentor,
  generateAccessAndRefreshTokenforUser,
};
