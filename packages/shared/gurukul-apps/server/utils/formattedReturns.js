import { apiErrorHandler } from "./apiErrorHandler.util.js";
import { apiResponseHandler } from "./apiResponseHandler.util.js";

export const success = (statusCode, message, data) => {
  return (res) => {
    return res
      .status(statusCode)
      .json(new apiResponseHandler(statusCode, message, data));
  };
};

export const error = (statusCode, message) => {
  return (res) => {
    return res
      .status(statusCode)
      .json(new apiErrorHandler(statusCode, message));
  };
};
