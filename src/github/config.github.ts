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
const base64Key = convertPemToBase64(filePath);
      if (!base64Key) {
        throw new Error("Private Key not found");
      }
      // Decode the Base64-encoded key to binary data
      const binaryKey = Buffer.from(base64Key, "base64");
      const stringKey = binaryKey.toString("utf8");
      
      if (!appId || !stringKey) {
        throw new Error("App ID or Private Key not found");
      }
      const app = new App({
        appId,
        privateKey: stringKey,
      });
      const api = await app.getInstallationOctokit(installationId);
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