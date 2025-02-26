import AWS from "aws-sdk";

const amplify = new AWS.Amplify({ region: "ap-south-1" });

export const createSubDomain = async (brandName, founderName, appId, appName) => {
  try {
    const response = await amplify.createDomainAssociation({
      appId,
      domainName: `saikatdas.click`,
      subDomainSettings: [
        {
          prefix: `${brandName}-${founderName}`,
          branchName: appName,
        },
      ],
    }).promise();
    console.log("custom domain created", response);
  } catch (error) {
    console.log("error in creating custom domain", error);
  }
};