import express from 'express';
import env from '../../../../../env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { founderRoutes } from './routes/founder.route.js';
import { brandRouter } from './routes/brand.route.js';

const app = express();
const isDev = env.ENVIRONMENT === 'development';
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, false);
    if (isDev && origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    const allowedOriginRegex = /^https:\/\/[a-z0-9-]+\.gurukul\.com$/;
    if (allowedOriginRegex.test(origin)) {
      return callback(null, true);
    }

    callback(new Error('CORS policy violation: Origin not allowed'));
  },
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(`/api/${env.SERVER_API_VERSION}/main/founder`, founderRoutes);
app.use(`/api/${env.SERVER_API_VERSION}/main/brand`, brandRouter);

export { app };
