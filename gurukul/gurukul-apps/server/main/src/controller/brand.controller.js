import {
  apiResponseHandler,
  asyncFuncHandler,
  Brand,
  createSubDomain,
  deployBrand,
  Educator,
} from '@gurukul/shared-server';
import { roles, statusCodes } from '../../../config/constants.js';
import {
  error,
  success,
} from '@gurukul/shared-server/utils/formattedReturns.js';
import { uploadImageToS3 } from '../services/s3Upload.js';

const createBrand = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to founder only'
    )(res);
  }
  console.log('req.user', req.user);
  const founderId = req.user._id;
  if (!founderId) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, founder ID not found'
    )(res);
  }
  const { name, logo, color, founderName } = req?.body;
  //sanitize data from frontend
  if (!name || !logo || !color) {
    return error(400, statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  // const brand = await Brand.find({ name }, { new: true });
  // if (brand.length !== 0) {
  //   return error(
  //     statusCodes.BAD_REQUEST,
  //     "Brand already exists for this name"
  //   )(res);
  // }
  // //now create dummy brand
  // const dummyBrand = await Brand.create({
  //   name,
  //   logo,
  //   color,
  //   base_url: "hulabuga.com",
  //   established_by: req.user._id,
  // });
  // if (!dummyBrand) {
  //   return error(
  //     statusCodes.INTERNAL_SERVER_ERROR,
  //     "Failed to create brand for some unknown reason"
  //   )(res);
  // }

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

  const brand = await Brand.create({
    name,
    logo,
    color,
    base_url: `${name}-${founderName}.gurukul.click`,
    established_by: founderId,
  });
  if (!brand) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create brand for some unknown reason'
    )(res);
  }
  deployBrand({
    brandName: name,
    brandColor: color,
    brandLogo: logo,
    founderName,
    brandId: brand._id,
  });
  return success(statusCodes.CREATED, 'Brand created successfully', brand)(res);
});

const getAllEducatorsOfAllBrandsBelongsToFounder = asyncFuncHandler(
  async (req, res) => {
    const role = req?.role;
    if (role !== roles.FOUNDER) {
      return error(
        401,
        statusCodes.UNAUTHORIZED,
        'Unauthorized access, restricted to founder only'
      )(res);
    }
    const founderId = req.user._id;
    const brands = await Brand.find({ established_by: founderId });
    if (!brands.length) {
      return error(
        404,
        statusCodes.NOT_FOUND,
        'No brands found for this founder'
      )(res);
    }
    const brandIds = brands.map((brand) => brand._id);
    const educators = await Brand.aggregate([
      {
        $match: {
          _id: { $in: brandIds },
        },
      },
      {
        $lookup: {
          from: 'educators',
          localField: '_id',
          foreignField: 'belongs_to_brand',
          as: 'educators',
        },
      },
    ]);
    console.log('educators', educators);

    if (!educators.length) {
      return error(
        statusCodes.NOT_FOUND,
        'No educators found for this founder'
      )(res);
    }
    return success(
      statusCodes.OK,
      'Educators found successfully',
      educators
    )(res);
  }
);

const uploadBrandLogo = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to founder only'
    )(res);
  }
  const { file } = req.body;
  if (!file || !file.startsWith('data:image/')) {
    return error(statusCodes.BAD_REQUEST, 'Invalid image format')(res);
  }

  const s3Url = await uploadImageToS3(file);
  if (!s3Url) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to upload image to S3'
    )(res);
  }
  return success(statusCodes.OK, 'Image uploaded successfully', {
    imageUrl: s3Url,
  })(res);
});

export {
  createBrand,
  getAllEducatorsOfAllBrandsBelongsToFounder,
  uploadBrandLogo,
};
