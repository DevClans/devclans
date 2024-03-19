import { zodGithubAccessToken } from "@/zod/zod.common";
import { App, Octokit } from "octokit";
import fs from "fs"


function convertPemToBase64(filePath:string) {
    try {
        // Read the .pem file synchronously
        const pemData = fs.readFileSync(filePath, 'base64');

        // Extract the RSA key from the .pem file, removing header, footer, and newlines
        const base64Key = pemData
            .replace(/-----BEGIN RSA PRIVATE KEY-----/, "")
            .replace(/-----END RSA PRIVATE KEY-----/, "")
            .trim()
            
  
        return base64Key;
    } catch (error) {
        console.error('Failed to convert PEM to Base64:', error);
        return null; // or throw the error, depending on your error handling strategy
    }
}

function readFile(filePath:string){
  // read base64 file and return 
  const base64Key = fs.readFileSync(filePath, 'base64');
  return base64Key;
}
export const getOctokit = async ({
  installationId,
  accessToken,
}: {
  installationId?: number;
  accessToken?: string;
}) => {
  try {
    if (installationId) {
      const appId = process.env.AUSPY_GITHUB_APP_ID;
      
// Usage example
const filePath = 'src/github/privateKey_pkcs8.pem';
//const base64Key = readFile(filePath);
const base64Key = convertPemToBase64(filePath);
//const base64Key = process.env.AUSPY_GITHUB_PRIVATE_KEY;
      //const base64Key = process.env.AUSPY_GITHUB_PRIVATE_KEY;
      if (!base64Key) {
        throw new Error("Private Key not found");
      }
      console.log("This is base64Key",base64Key);
      // Decode the Base64-encoded key to binary data
      const binaryKey = Buffer.from(base64Key, "base64");
     // console.log("This is binaryKey",binaryKey);
      // Convert the binary key to a string
      const stringKey = binaryKey.toString("utf8");
   //   console.log("This is stringKey",stringKey);
      
      if (!appId || !stringKey) {
        throw new Error("App ID or Private Key not found");
      }
      const app = new App({
        appId,
        privateKey: stringKey,
      });
      console.log(app);
      const api = await app.getInstallationOctokit(installationId);
      console.log("returning as app",api);
      return {
        api: api,
        type: "app",
      };
    } else if (zodGithubAccessToken.safeParse(accessToken).success) {
      console.log("returning as auth")
      return {
        api: new Octokit({
          auth: accessToken,
        }),
        type: "auth",
      };
    } else {
      console.log("returning as free")
      return { api: new Octokit({}), type: "free" };
    }
  } catch (error) {
    console.error("Error getting octokit", error);
    return null;
  }
};