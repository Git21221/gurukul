import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import env from "../../../../../../env.js";
import { educatorRouter } from "./routes/educator.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(`/api/${env.SERVER_API_VERSION}/brand/educator`, educatorRouter);

export { app };