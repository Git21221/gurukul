import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import simpleGit from 'simple-git';
import { createSubDomain } from './createSubDomain.util.js';
import env from '../../../../../env.js';
import {
  AmplifyClient,
  CreateAppCommand,
  CreateBranchCommand,
  StartJobCommand,
  UpdateBranchCommand,
} from '@aws-sdk/client-amplify';

// Inject GitHub token into clone URL (safe for CI/CD)
const REPO_URL = `https://x-access-token:${env.GITHUB_OAUTH_TOKEN_AMPLIFY}@github.com/Git21221/gurukul.git`;
const ACTUAL_REPO_URL = 'https://github.com/git21221/gurukul.git';

const amplify = new AmplifyClient({ region: 'ap-south-1' });
const git = simpleGit();

/**
 * Deploys a brand website to AWS Amplify.
 * Automates:
 * 1. Cloning the repository
 * 2. Updating branding configurations
 * 3. Committing and pushing changes
 * 4. Creating an Amplify app
 * 5. Mapping a custom subdomain
 *
 * @param {Object} params - Brand deployment parameters.
 * @param {string} params.brandName - Name of the brand.
 * @param {string} params.brandColor - Brand primary color.
 * @param {string} params.brandLogo - URL of the brand logo.
 * @param {string} params.founderName - Name of the founder.
 */
export const deployBrand = async ({
  brandName,
  brandColor,
  brandLogo, //base64 data URI
  founderName,
  brandId,
}) => {
  // Define paths for local processing
  process.chdir('/home/ec2-user');
  const tempDir = path.join(process.cwd(), 'temp', brandName);
  console.log(`Temporary directory: ${tempDir} w`);
  const publicDir = path.join(
    tempDir,
    'gurukul/gurukul-apps/client/brand-app/brand/public'
  );
  const brandingFile = path.join(publicDir, 'branding.json');
  const appName = `${brandName}-${founderName}`; //also branch name
  let ext = '';
  try {
    console.log('Creating temporary directory...');
    fs.removeSync(tempDir);
    fs.ensureDirSync(tempDir);

    console.log('Cloning repository...');
    execSync(`git clone ${REPO_URL} "${tempDir}"`, { stdio: 'inherit' });

    console.log('Ensuring public directory exists...');
    fs.ensureDirSync(publicDir);
    //determine image format and decode base64
    let logoFileName = null;

    if (brandLogo.startsWith('data:image/')) {
      const matches = brandLogo.match(
        /^data:image\/([a-zA-Z0-9.+-]+);base64,(.+)$/
      );
      if (!matches) {
        throw new Error('Invalid base64 image format');
      }
      ext = matches[1].split('+')[0];
      const buffer = Buffer.from(matches[2], 'base64');
      logoFileName = `brand_logo.${ext}`;
      const logoPath = path.join(publicDir, logoFileName);
      console.log('Writing brand logo to file...');
      fs.writeFileSync(logoPath, buffer);
      console.log(`Brand logo saved as ${logoFileName}`);
    }
    console.log('Creating branding.json...');
    const brandingData = { brandName, brandColor, brandId, ext };
    fs.writeFileSync(brandingFile, JSON.stringify(brandingData, null, 2));

    console.log('Committing & Pushing changes...');
    await git
      .cwd(tempDir)
      .branch([appName])
      .checkout(appName)
      .add('.')
      .commit(`Added branding.json and logo for ${appName}`)
      .push('origin', appName);
    console.log('Creating new Amplify app...');
    const createAppCommand = new CreateAppCommand({
      name: appName,
      repository: ACTUAL_REPO_URL,
      defaultBranch: appName,
      oauthToken: env.GITHUB_OAUTH_TOKEN_AMPLIFY,
      platform: 'WEB',
      buildSpec: `
          version: 1
          frontend:
              phases:
                  preBuild:
                      commands:
                          - 'npm i -g pnpm && pnpm i'
                  build:
                      commands:
                          - 'npm run build:client:brand'
              artifacts:
                  baseDirectory: gurukul/build-client/dist-brand
                  files:
                      - '**/*'
              cache:
                  paths:
                      - 'node_modules/**/*'
        `,
    });

    const amplifyApp = await amplify.send(createAppCommand);
    console.log(`Amplify App Created: ${amplifyApp.app.appId}`);

    console.log(`Creating ${appName} branch in Amplify...`);
    const createBranchCommand = new CreateBranchCommand({
      appId: amplifyApp.app.appId,
      branchName: appName,
    });
    const updateBranchCommand = new UpdateBranchCommand({
      appId: amplifyApp.app.appId,
      branchName: appName,
      environmentVariables: {
        VITE_ENVIRONMENT: 'production',
        VITE_MAIN_BASE_API_PROD_URL: 'https://app.gurukul.click',
        VITE_BRAND_BASE_API_PROD_URL: 'https://brand.gurukul.click',
        VITE_MAIN_SERVER_PORT: '4000',
        VITE_BRAND_SERVER_PORT: '4001',
      },
    });
    await amplify.send(createBranchCommand);
    await amplify.send(updateBranchCommand);

    console.log('Starting build process...');
    const startJobCommand = new StartJobCommand({
      appId: amplifyApp.app.appId,
      branchName: appName,
      jobType: 'RELEASE',
    });
    await amplify.send(startJobCommand);

    console.log('Setting up subdomain...');

    // Map custom subdomain to Amplify app
    await createSubDomain(
      brandName,
      founderName,
      amplifyApp.app.appId,
      appName
    );
  } catch (error) {
    console.error('Deployment failed:', error);
  } finally {
    console.log('Cleaning up temporary files...');
    fs.removeSync(tempDir);
    console.log('Cleanup complete.');
  }
};
