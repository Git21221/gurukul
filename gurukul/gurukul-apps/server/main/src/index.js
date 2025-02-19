import { connectionDB } from "@gurukul/shared-server";
import { app } from "./app.js";
import env from "../../../../../env.js";

const PORT = env.MAIN_SERVER_PORT || 8000;

connectionDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
