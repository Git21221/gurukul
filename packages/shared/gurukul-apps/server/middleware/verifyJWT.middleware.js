import { apiErrorHandler } from "../utils/apiErrorHandler.util";
import { asyncFuncHandler } from "../utils/asyncFuncHandler.util";

const verifyJWT = asyncFuncHandler(async (req, res, next) => {
  const { accessToken, refreshToken } = req?.cookie;
  if (!accessToken || !refreshToken) {
    return res.status(401).json(new apiErrorHandler(401, "Unauthorized"));
  }
  // verify jwt token
  
});
