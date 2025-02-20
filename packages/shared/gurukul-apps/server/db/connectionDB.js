import mongoose from "mongoose";
import env from "../../../../../env.js";

const URI =
  env.ENVIRONMENT === "development"
    ? env.MONGODB_TEST_DATABASE_URL
    : env.MONGODB_PROD_DATABASE_URL;

export const connectionDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
