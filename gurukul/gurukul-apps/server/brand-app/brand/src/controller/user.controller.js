import {
  asyncFuncHandler,
  checkValidEmail,
  checkValidPassword,
  error,
  success,
  User,
} from '@gurukul/shared-server';
import { statusCodes } from '../../../../config/constants.js';

const registerUser = asyncFuncHandler(async (req, res) => {
  const ip = req.ip;
  const { email, fullName, password } = req.body;
  console.log(email, fullName, password);

  const { brandId } = req.params;
  if (!ip) {
    return error(statusCodes.BAD_REQUEST, 'IP address is required')(res);
  }
  if (!email || !fullName || !password) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  if (!brandId) {
    return error(statusCodes.BAD_REQUEST, 'Brand ID is required')(res);
  }
  //check email format
  if (!checkValidEmail(email)) {
    return error(statusCodes.BAD_REQUEST, 'Invalid email')(res);
  }
  //check password length and characters
  if (checkValidPassword(password).error) {
    return error(
      statusCodes.BAD_REQUEST,
      checkValidPassword(password).message
    )(res);
  }
  //check if user already exists
  const existingUser = await User.find({
    emailId: email,
    platform_of_account: brandId,
  });
  if (existingUser.length !== 0) {
    return error(statusCodes.BAD_REQUEST, 'User already exists')(res);
  }

  //create new user
  const user = await User.create({
    emailId: email,
    fullName,
    password,
    ipv4_address: ip,
    platform_of_account: brandId,
  });
  if (!user) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      'Failed to create user'
    )(res);
  }
  return success(statusCodes.CREATED, 'User created successfully', user)(res);
});

export { registerUser };
