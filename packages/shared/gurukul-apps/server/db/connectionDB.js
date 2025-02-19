import { MongoClient, ServerApiVersion } from "mongodb";
import env from "../../../../../env.js";

const URI =
  env.ENVIRONMENT === "development"
    ? env.MONGODB_TEST_DATABASE_URL
    : env.MONGODB_PROD_DATABASE_URL;

const DB_NAME = env.MONGODB_TEST_DATABASE_NAME;
console.log("URI", URI);
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const connectionDB = async () => {
  try {
    await client.connect();
    const pi = await client.db().admin().command({ ping: 1 });
    if (pi.ok) {
      console.log("Successfully connected to the database");
    }
  } catch (error) {
    console.log("Error connecting to the database", error);
  } finally {
    await client.close();
  }
};
