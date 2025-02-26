//all shared models
import { Brand } from "./models/brand.model.js";
import { Founder } from "./models/founder.model.js";
import { Certificate } from "./models/certificate.model.js";
import { Course } from "./models/course.model.js";

//shared DB connection
import { connectionDB } from "./db/connectionDB.js";

//shared utility
import { asyncFuncHandler } from "./utils/asyncFuncHandler.util.js";
import { apiResponseHandler } from "./utils/apiResponseHandler.util.js";
import { apiErrorHandler } from "./utils/apiErrorHandler.util.js";
import { checkValidEmail } from "./utils/checkValidEmail.util.js";
import { checkValidPassword } from "./utils/checkValidPassword.util.js";
import {
  generateAccessAndRefreshTokenforFounder,
  generateAccessAndRefreshTokenforEducator,
  generateAccessAndRefreshTokenforMentor,
} from "./utils/generateAccessRefreshToken.util.js";
import {
  refreshTokenOptions,
  accessTokenOptions,
  refreshAccessTokenForFounder,
  refreshAccessTokenForEducator,
  refreshAccessTokenForMentor,
} from "./utils/refreshAccessToken.util.js";
import { deployBrand } from "./utils/deployBrand.util.js";
import { createSubDomain } from "./utils/createSubDomain.util.js";

export {
  Brand,
  Founder,
  Certificate,
  Course,
  connectionDB,
  asyncFuncHandler,
  apiResponseHandler,
  apiErrorHandler,
  checkValidEmail,
  checkValidPassword,
  generateAccessAndRefreshTokenforFounder,
  generateAccessAndRefreshTokenforEducator,
  generateAccessAndRefreshTokenforMentor,
  refreshTokenOptions,
  accessTokenOptions,
  refreshAccessTokenForFounder,
  refreshAccessTokenForEducator,
  refreshAccessTokenForMentor,
  deployBrand,
  createSubDomain,
};
