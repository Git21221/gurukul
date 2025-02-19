import { MongoClient, ServerApiVersion } from "mongodb";
import env from "../../../../../env.js";
// import { join, dirname } from "path";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config({ path: join(__dirname, "../../../../../.env") });

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
    // await client.db(DB_NAME).command({ ping: 1 });
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
  } finally {
    await client.close();
  }
};
