import { zodGithubAccessToken } from "@/zod/zod.common";
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
      return {
        api: await app.getInstallationOctokit(installationId),
        type: "app",
      };
    } else if (zodGithubAccessToken.parse(accessToken)) {
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
