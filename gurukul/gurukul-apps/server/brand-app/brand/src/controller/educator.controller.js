import {
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  Educator,
  Referral,
} from "@gurukul/shared-server";
import jwt from "jsonwebtoken";
import env from "../../../../../../../env.js";
import { statusCodes } from "../../../../config/constants.js";
import {
  error,
  success,
} from "@gurukul/shared-server/utils/formattedReturns.js";

const registerEducator = asyncFuncHandler(async (req, res) => {
  const { email, fullName, password } = req?.body;
  const { token } = req?.query;
  //sanitize data from frontend
  if (!email || !fullName || !password) {
    return error(statusCodes.BAD_REQUEST, "Missing required fields")(res);
  }
  //check token
  if (!token) {
    return error(statusCodes.BAD_REQUEST, "Missing token in query params")(res);
  }
  //check email format
  if (!checkValidEmail(email)) {
    return error(statusCodes.BAD_REQUEST, "Invalid email")(res);
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
    return error(statusCodes.BAD_REQUEST, "Educator already exists")(res);
  }

  //check token validity
  const tokenData = jwt.verify(token, env.JWT_REFERRAL_TOKEN);
  const referral = await Referral.find({
    referral_code: tokenData.referral_code,
  }).select({ _id: 1, referral_code: 1, founder_id: 1, brand_id: 1 });
  if (referral.length === 0) {
    return error(statusCodes.BAD_REQUEST, "Invalid token")(res);
  }
  //check if token is already used
  const usedReferral = await Referral.find({ token });
  if (usedReferral[0].used) {
    return error(statusCodes.BAD_REQUEST, "Token already used")(res);
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
      "Failed to update referral code to used"
    )(res);
  }

  if (!educator) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create educator for some unknown reason"
    )(res);
  }

  return success(statusCodes.CREATED, "Educator created successfully")(res);
});

export { registerEducator };
