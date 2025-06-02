import { asyncFuncHandler, Course, error, success } from "@gurukul/shared-server";
import { roles, statusCodes } from "../../../../config/constants.js";

const createCourse = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, restricted to educator and founder only"
    )(res);
  }
  const {
    course_name,
    price,
    description,
    educators,
    mentors,
    videos,
    table_of_contents,
  } = req?.body;
  const { brandId } = req?.params;
  //check if brandId is valid for this user
  const isAuthorised = await verifyBrandWithUser(role, brandId, req.user._id);
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, you are not associated with this brand"
    )(res);
  }
  //sanitize data from frontend
  if (!course_name || !price) {
    return error(statusCodes.BAD_REQUEST, "Missing required fields")(res);
  }
  //check for existed course
  const existedCourse = await Course.find(
    { course_name, belongs_to_brand: brandId },
    { new: true }
  );
  if (existedCourse.length !== 0) {
    return error(
      statusCodes.BAD_REQUEST,
      "Course already exists for this name on this brand"
    )(res);
  }
  //create new course
  const courseData = {
    course_name,
    description,
    price,
    educators: (educators || []).map(
      (educator) => new mongoose.Types.ObjectId(educator)
    ),
    mentors: (mentors || []).map(
      (mentor) => new mongoose.Types.ObjectId(mentor)
    ),
    videos: (videos || []).map((video) => new mongoose.Types.ObjectId(video)),
    table_of_contents: table_of_contents || [],
    belongs_to_brand: new mongoose.Types.ObjectId(brandId),
  };
  if (role === roles.EDUCATOR) {
    courseData.created_by_educator = req.user._id;
  }
  if (role === roles.FOUNDER) {
    courseData.created_by_founder = req.user._id;
  }
  const course = await Course.create(courseData);
  if (!course) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Error in creating course"
    )(res);
  }
  return success(
    statusCodes.CREATED,
    "Course created successfully",
    course
  )(res);
});
