import {
  apiErrorHandler,
  apiResponseHandler,
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  Educator,
  Referral,
} from "@gurukul/shared-server";
import jwt from "jsonwebtoken";
import env from "../../../../../../../env.js";
import { statusCodes } from "../../../../config/constants.js";

const registerEducator = asyncFuncHandler(async (req, res) => {
  const { email, fullName, password } = req?.body;
  const { token } = req?.query;
  //sanitize data from frontend
  if (!email || !fullName || !password) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json(new apiErrorHandler(400, "Missing required fields"));
  }
  //check token
  if (!token) {
    return res.status(400).json(new apiErrorHandler(400, "Missing token"));
  }
  //check email format
  if (!checkValidEmail(email)) {
    return res.status(400).json(new apiErrorHandler(400, "Invalid email"));
  }
  //check password length and characters
  if (checkValidPassword(password).error) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, checkValidPassword(password).message));
  }

  //check for existed educator
  const existedEducator = await Educator.find({ emailId: email }, { new: true });
  if (existedEducator.length !== 0) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Educator already exists"));
  }

  //check token validity
  const tokenData = jwt.verify(token, env.JWT_REFERRAL_TOKEN);
  const referral = await Referral.find({
    referral_code: tokenData.referral_code,
  }).select({ _id: 1, referral_code: 1, founder_id: 1, brand_id: 1 });
  if (referral.length === 0) {
    return res.status(400).json(new apiErrorHandler(400, "Invalid token"));
  }
  //check if token is already used
  if (referral[0].used) {
    return res.status(400).json(new apiErrorHandler(400, "Token already used"));
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
    return res
      .status(500)
      .json(
        new apiErrorHandler(
          500,
          "Failed to update referral for some unknown reason"
        )
      );
  }

  if (!educator) {
    return res
      .status(500)
      .json(
        new apiErrorHandler(
          500,
          "Failed to create educator for some unknown reason"
        )
      );
  }

  return res
    .status(201)
    .json(new apiResponseHandler(201, "Educator created successfully"));
});

export { registerEducator };
