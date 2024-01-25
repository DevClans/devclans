import { App, Octokit } from "octokit";

export const getOctokit = async ({
  installationId,
  accessToken,
}: {
  installationId?: number;
  accessToken?: string;
}) => {
  try {
    if (installationId) {
      const app = new App({
        appId: process.env.GITHUB_APP_ID || "",
        privateKey: process.env.GITHUB_PRIVATE_KEY || "",
      });
      return await app.getInstallationOctokit(installationId);
    } else if (accessToken) {
      return new Octokit({
        auth: accessToken,
      });
    } else {
      return new Octokit({});
    }
  } catch (error) {
    console.error("Error getting octokit", error);
    return null;
  }
};
