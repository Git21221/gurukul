import {
  apiResponseHandler,
  asyncFuncHandler,
  Brand,
  createSubDomain,
  deployBrand,
} from "@gurukul/shared-server";
import { roles } from "../../../config/constants.js";

const createBrand = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.FOUNDER) {
    return res
      .status(403)
      .json(
        new apiErrorHandler(403, "Unauthorized access, restricted to founder only")
      );
  }
  const { name, logo, color, founderName } = req?.body;
  // const { founderId } = req?.user;
  //sanitize data from frontend
  if (!name || !logo || !color) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Missing required fields"));
  }
  const brand = await Brand.find({ name }, { new: true });
  if (brand.length !== 0) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Brand name already exists"));
  }
  //now create dummy brand
  const dummyBrand = await Brand.create({
    name,
    logo,
    color,
    base_url: "hulabuga.com",
    established_by: req.user._id,
  });
  if (!dummyBrand) {
    return res
      .status(500)
      .json(new apiErrorHandler(500, "Failed to create brand for some reason"));
  }

  //check for existed brand
  // const existedBrand = await Brand.find({
  //   $and: [{ name }, { established_by: founderId }],
  // });
  // if (existedBrand.length !== 0) {
  //   return res
  //     .status(400)
  //     .json(
  //       new apiErrorHandler(400, "Same brand already exists for your account")
  //     );
  // }

  //check payment done

  //check if domain name exists (brandname.foundername.gurukul.com)

  //deploy brand website with customizations on aws

  //generate brand url

  // deployBrand({ brandName: name, brandColor: color, brandLogo: logo, founderName });
  //save on DB
  // const brand = await Brand.create({
  //   name,
  //   logo,
  //   color,
  //   base_url: `${name}.${founderId}.gurukul.com`,
  //   established_by: founderId,
  // });
  return res
    .status(201)
    .json(new apiResponseHandler(201, "Brand created successfully"));
});

const getAllEducators = asyncFuncHandler(async (req, res) => {
  
});

export { createBrand, getAllEducators };
