import express from 'express';
import env from '../../../../../env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { founderRoutes } from './routes/founder.route.js';
import { brandRouter } from './routes/brand.route.js';

const app = express();
const isDev = env.ENVIRONMENT === 'development';
console.log(`Environment: ${env.ENVIRONMENT}, Is Development: ${isDev}`);
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, false);
    if (isDev && origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    const allowedOrigins = ['https://gurukul.click'];
    const allowedOriginRegex = /^https:\/\/[a-z0-9-]+\.gurukul\.click$/i;

    if (allowedOrigins.includes(origin) || allowedOriginRegex.test(origin)) {
      return callback(null, true);
    }

    callback(new Error('CORS policy violation: Origin not allowed'));
  },
  credentials: true,
};

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(`/api/${env.SERVER_API_VERSION}/main/founder`, founderRoutes);
app.use(`/api/${env.SERVER_API_VERSION}/main/brand`, brandRouter);
app.get('/', (_, res) => {
  res.send('API is running');
});

export { app };
