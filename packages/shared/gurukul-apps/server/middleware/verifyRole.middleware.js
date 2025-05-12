import env from "../../../../../env.js";
import { apiErrorHandler } from "../utils/apiErrorHandler.util.js";
import { asyncFuncHandler } from "../utils/asyncFuncHandler.util.js";
import jwt from "jsonwebtoken";

const verifyROLE = asyncFuncHandler(async (req, res, next) => {
  const user_role = req.cookies?.user_role;
  if (!user_role) {
    return res
      .status(401)
      .json(new apiErrorHandler(401, "Role not found in cookies"));
  }
  console.log(user_role);
  const decodedUserRole = jwt.verify(user_role, env.JWT_USER_ROLE_SECRET);
  console.log(decodedUserRole);
  if (!decodedUserRole) {
    return res.status(401).json(new apiErrorHandler(401, "Invalid role token"));
  }
  req.role = decodedUserRole.role;
  next();
});

export { verifyROLE };
