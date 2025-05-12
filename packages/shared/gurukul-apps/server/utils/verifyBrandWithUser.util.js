import {
  roles,
} from "../../../../../gurukul/gurukul-apps/server/config/constants.js";
import { Brand } from "../models/brand.model.js";
import { Educator } from "../models/educator.model.js";
import { Mentor } from "../models/mentor.model.js";

export const verifyBrandWithUser = async (role, brandId, userId) => {
  if (!role || !brandId || !userId) {
    return false;
  }

  if (role === roles.FOUNDER) {
    const brand = await Brand.findOne({
      _id: brandId,
      established_by: userId,
    });
    return !!brand;
  }

  if (role === roles.EDUCATOR) {
    const educator = await Educator.findOne({
      _id: userId,
      belongs_to_brand: brandId,
    });
    return !!educator;
  }

  if (role === roles.MENTOR) {
    const mentor = await Mentor.findOne({
      _id: userId,
      belongs_to_brand: brandId,
    });
    return !!mentor;
  }

  return false;
};
