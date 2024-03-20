import { zodGithubAccessToken } from "@/zod/zod.common";
import { App, Octokit } from "octokit";
import fs from 'fs';

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

      const base64Key = process.env.AUSPY_GITHUB_PRIVATE_KEY;
      if (!base64Key) {
        throw new Error("Private Key not found");
      }
      // Decode the Base64-encoded key to binary data
      const binaryKey = Buffer.from(base64Key, "base64");
      // Convert the binary key to a string
      const stringKey = binaryKey.toString("utf8");

      if (!appId || !stringKey) {
        throw new Error("App ID or Private Key not found");
      }
      const app = new App({
        appId,
        privateKey: stringKey,
      });
      return {
        api: await app.getInstallationOctokit(installationId),
        type: "app",
      };

      
    // const appId = process.env.AUSPY_GITHUB_APP_ID;
    // const filepath = './devclans-local.pem';

    // const base64Key = fs
    //   .readFileSync(filepath, "base64")
    //   .replace("-----BEGIN RSA PRIVATE KEY-----", "")
    //   .replace("-----END RSA PRIVATE KEY-----", "")
    //   .trim();
    // // Decode the Base64-encoded key to binary data
    // const binaryKey = Buffer.from(base64Key, "base64");

    // // Convert the binary key to a string (optional)
    // const stringKey = binaryKey.toString("utf8");
    // // console.log("My key is: ", myKey);
    // if (!appId || !base64Key) {
    //   throw new Error("App ID or Private Key not found");
    // }
    // const app = new App({
    //   appId,
    //   privateKey: stringKey,
    // });
    // return {
    //   api: await app.getInstallationOctokit(installationId),
    //   type: "app",
    // };

    } else if (zodGithubAccessToken.safeParse(accessToken).success) {
      return {
        api: new Octokit({
          auth: accessToken,
        }),
        type: "auth",
      };
    } else {
      return { api: new Octokit({}), type: "free" };
    }
  } catch (error) {
    console.error("Error getting octokit", error);
    return null;
  }
};

