import { Founder } from "../models/founder.model.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.util.js";
import { asyncFuncHandler } from "../utils/asyncFuncHandler.util.js";
import { refreshAccessTokenForEducator, refreshAccessTokenForFounder, refreshAccessTokenForMentor } from "../utils/refreshAccessToken.util.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncFuncHandler(async (req, res, next) => {
  try {
    let token;
    if(req?.cookies?.accessToken){
      token = req.cookies.accessToken;
    }
    else if (req?.cookies?.refreshToken) {
      token = req.cookies.refreshToken;
      const role = req.role;
      let accessToken, refreshToken;
      if (role === "founder") {
        const tokens = await refreshAccessTokenForFounder(req, res);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      } else if (role === "educator") {
        const tokens = await refreshAccessTokenForEducator(req, res);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      } else if (role === "mentor") {
        const tokens = await refreshAccessTokenForMentor(req, res);
        accessToken = tokens.accessToken;
        refreshToken = tokens.refreshToken;
      }
      token = accessToken;
    }
    console.log(token);
    if (!token) {
      return res.status(401).json(new apiErrorHandler(401, "Token expired! try logging in again"));
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    const user = await Founder.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(401).json(new apiErrorHandler(401, "User not found! Try logging in again"));
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(new apiErrorHandler(401, "Unauthorized", error.message));
  }
});

export {verifyJWT};