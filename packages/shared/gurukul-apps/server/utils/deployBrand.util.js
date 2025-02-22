import { execSync } from "child_process";
import fs from "fs-extra";
import AWS from "aws-sdk";
import path from "path";

const REPO_URL = "https://github.com/Git21221/gurukul.git";
const s3 = new AWS.S3();

export const deployBrand = async ({ brandName, brandcolor, brandLogo }) => {
  const tempDir = path.resolve(
    process.cwd(),
    "../../client/brand-app/brand",
    brandName
  );
  const brandingFile = path.join(tempDir, "public", "branding.json");
  const s3Bucket = "gurukul-brand-website";
  const s3Folder = `${brandName}/`;

  try {
    console.log("Creating temporary directory...");
    fs.removeSync(tempDir); // Remove if already exists
    fs.ensureDirSync(tempDir); // Ensure directory exists

    console.log("Cloning repository...");
    execSync(`git clone ${REPO_URL} "${tempDir}"`, { stdio: "inherit" });

    console.log("Ensuring public directory exists...");
    fs.ensureDirSync(path.join(tempDir, "public")); // Create public/ if missing

    console.log("Creating branding.json...");
    const brandingData = { brandName, brandLogo, brandcolor };
    fs.writeFileSync(brandingFile, JSON.stringify(brandingData, null, 2));

    console.log("Installing dependencies...");
    execSync("npm install", { cwd: tempDir, stdio: "inherit" });

    console.log("Building the project...");
    execSync("npm run build:client:brand", { cwd: tempDir, stdio: "inherit" });

    console.log("Uploading to S3...");
    execSync(
      `aws s3 sync ${tempDir}/dist/ s3://${s3Bucket}/${s3Folder}/ --acl public-read`,
      { stdio: "inherit" }
    );

    console.log(`✅ Brand ${brandName} deployed successfully!`);
  } catch (error) {
    console.error("Deployment failed:", error);
  } finally {
    // Cleanup: Delete cloned folder
    console.log("Cleaning up temporary files...");
    fs.removeSync(tempDir);
    console.log("Cleanup complete.");
  }
};
