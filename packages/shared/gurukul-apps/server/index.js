//all shared models
import { Article } from './models/article.model.js';
import { AudioMetaData } from './models/audioMetadata.model.js';
import { Brand } from './models/brand.model.js';
import { BrandView } from './models/brandViews.model.js';
import { Certificate } from './models/certificate.model.js';
import { Comment } from './models/comment.model.js';
import { Course } from './models/course.model.js';
import { Educator } from './models/educator.model.js';
import { Feedback } from './models/feedback.model.js';
import { Founder } from './models/founder.model.js';
import { Mentor } from './models/mentor.model.js';
import { Playlist } from './models/playlist.model.js';
import { Progress } from './models/progress.model.js';
import { Referral } from './models/referral.model.js';
import { User } from './models/user.model.js';
import { Video } from './models/video.model.js';
import { VideoMetaData } from './models/videoMetadata.model.js';
import { VideoView } from './models/videoViews.model.js';

//shared DB connection
import { connectionDB } from './db/connectionDB.js';

//shared utility
import { asyncFuncHandler } from './utils/asyncFuncHandler.util.js';
import { apiResponseHandler } from './utils/apiResponseHandler.util.js';
import { apiErrorHandler } from './utils/apiErrorHandler.util.js';
import { checkValidEmail } from './utils/checkValidEmail.util.js';
import { checkValidPassword } from './utils/checkValidPassword.util.js';
import {
  generateAccessAndRefreshTokenforFounder,
  generateAccessAndRefreshTokenforEducator,
  generateAccessAndRefreshTokenforMentor,
  generateAccessAndRefreshTokenforUser,
} from './utils/generateAccessRefreshToken.util.js';
import {
  refreshTokenOptions,
  accessTokenOptions,
  refreshAccessTokenForFounder,
  refreshAccessTokenForEducator,
  refreshAccessTokenForMentor,
  refreshAccessTokenForUser,
} from './utils/refreshAccessToken.util.js';
import { deployBrand } from './utils/deployBrand.util.js';
import { createSubDomain } from './utils/createSubDomain.util.js';
import { success, error } from './utils/formattedReturns.js';
import { verifyBrandWithUser } from './utils/verifyBrandWithUser.util.js';
import { getVideoMetaData } from './utils/getVideoMetaData.util.js';

//shared middleware
import { verifyJWT } from './middleware/verifyJWT.middleware.js';
import { verifyROLE } from './middleware/verifyRole.middleware.js';
import { upload } from './middleware/multer.middleware.js';

export {
  Article,
  Brand,
  BrandView,
  Certificate,
  Comment,
  Course,
  Educator,
  Feedback,
  Founder,
  Mentor,
  User,
  Playlist,
  Progress,
  Referral,
  Video,
  VideoView,
  VideoMetaData,
  AudioMetaData,
  connectionDB,
  asyncFuncHandler,
  apiResponseHandler,
  apiErrorHandler,
  checkValidEmail,
  checkValidPassword,
  generateAccessAndRefreshTokenforFounder,
  generateAccessAndRefreshTokenforEducator,
  generateAccessAndRefreshTokenforMentor,
  generateAccessAndRefreshTokenforUser,
  refreshTokenOptions,
  accessTokenOptions,
  refreshAccessTokenForFounder,
  refreshAccessTokenForEducator,
  refreshAccessTokenForMentor,
  refreshAccessTokenForUser,
  deployBrand,
  createSubDomain,
  success,
  error,
  verifyBrandWithUser,
  getVideoMetaData,
  verifyJWT,
  verifyROLE,
  upload,
};
