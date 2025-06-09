import { roles } from '../../../../../gurukul/gurukul-apps/server/config/constants.js';
import { Educator } from '../models/educator.model.js';
import { Founder } from '../models/founder.model.js';
import { User } from '../models/user.model.js';
import { apiErrorHandler } from '../utils/apiErrorHandler.util.js';
import { asyncFuncHandler } from '../utils/asyncFuncHandler.util.js';
import {
  refreshAccessTokenForEducator,
  refreshAccessTokenForFounder,
  refreshAccessTokenForMentor,
} from '../utils/refreshAccessToken.util.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncFuncHandler(async (req, res, next) => {
  const role = req.role;
  if (!role) {
    return res
      .status(401)
      .json(new apiErrorHandler(401, 'Role not found! Please login again'));
  }
  try {
    let token;
    if (req?.cookies?.accessToken) {
      token = req.cookies.accessToken;
    } else if (req?.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
      const role = req.role;
      let accessToken, refreshToken;
      if (role === roles.FOUNDER) {
        const tokens = await refreshAccessTokenForFounder(req, res);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      } else if (role === roles.EDUCATOR) {
        const tokens = await refreshAccessTokenForEducator(req, res);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      } else if (role === roles.MENTOR) {
        const tokens = await refreshAccessTokenForMentor(req, res);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      }
      token = accessToken;
    }

    if (!token) {
      return res
        .status(401)
        .json(new apiErrorHandler(401, 'Token expired! try logging in again'));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    let user = null;
    switch (role) {
      case roles.FOUNDER:
        const user = await Founder.findById(decodedToken._id).select(
          '-password'
        );
        if (!user) {
          return res
            .status(401)
            .json(
              new apiErrorHandler(
                401,
                'Founder not found! Try logging in again'
              )
            );
        }
        break;
      case roles.EDUCATOR:
        const educator = await Educator.findById(decodedToken._id).select(
          '-password'
        );
        if (!educator) {
          return res
            .status(401)
            .json(
              new apiErrorHandler(
                401,
                'Educator not found! Try logging in again'
              )
            );
        }
        user = educator;
        break;
      case roles.USER:
        const actualUser = await User.findById(decodedToken._id).select(
          '-password'
        );
        if (!actualUser) {
          return res
            .status(401)
            .json(
              new apiErrorHandler(401, 'Mentor not found! Try logging in again')
            );
        }
        user = actualUser;
        break;
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new apiErrorHandler(401, 'Unauthorized', error.message));
  }
});

export { verifyJWT };
