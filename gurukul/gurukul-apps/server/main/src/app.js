import express from 'express';
import env from '../../../../../env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { founderRoutes } from './routes/founder.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}))
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/v1/founder", founderRoutes);

export { app };