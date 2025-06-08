import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import env from '../../../../../../env.js';
import { educatorRouter } from './routes/educator.route.js';
import { playlistRouter } from './routes/playlist.route.js';
import { videoRouter } from './routes/video.route.js';
import { courseRouter } from './routes/course.routes.js';

const app = express();
const isDev = (env.ENVIRONMENT = 'development' === 'development');
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
app.use(`/api/${env.SERVER_API_VERSION}/brand/educator`, educatorRouter);
app.use(`/api/${env.SERVER_API_VERSION}/brand/playlist`, playlistRouter);
app.use(`/api/${env.SERVER_API_VERSION}/brand/video`, videoRouter);
app.use(`/api/${env.SERVER_API_VERSION}/brand/course`, courseRouter);

export { app };
