import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadImageToS3 = async (base64Image) => {
  const matches = base64Image.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid base64 image format');
  }
  const ext = matches[1];
  const buffer = Buffer.from(matches[2], 'base64');
  const key = `logos/${uuidv4()}.${ext}`;
  const uplaodParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    body: buffer,
    contentEncoding: 'base64',
    ContentType: `image/${ext}`,
  };
  await s3.send(new PutObjectCommand(uplaodParams));
  return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
};
