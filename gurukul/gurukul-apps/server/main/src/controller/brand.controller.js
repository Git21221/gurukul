import {
  apiResponseHandler,
  asyncFuncHandler,
  Brand,
  deployBrand,
} from "@gurukul/shared-server";

const createBrand = asyncFuncHandler(async (req, res) => {
  const { name, logo, color } = req?.body;
  // const { founderId } = req?.user;
  //sanitize data from frontend
  if (!name || !logo || !color) {
    return res
      .status(400)
      .json(new apiErrorHandler(400, "Missing required fields"));
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

  deployBrand({ brandName: name, brandcolor: color, brandLogo: logo });
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

export { createBrand };
