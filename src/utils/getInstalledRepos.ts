// "use server";
import { Fetch } from "./fetchApi";

export const getGHInstaddedRepos = async (userId: string) => {
  if (!userId) {
    console.error("userId not found in getGHInstaddedRepos");
    return;
  }
  return await Fetch({
    endpoint: `/auth/github/getInstalledRepos?userId=${userId}`,
  });
};
