import { getOctokit } from "@/github/config.github";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { redisGet, redisSet } from "@/redis/basicRedis";
import { UserProps, UserRedisKeys } from "@/types/mongo/user.types";
import { zodGithubInstallationId, zodMongoId } from "@/zod/zod.common";
import getServerSessionForServer from "./auth/getServerSessionForApp";

export const getInstallationId = async (userId?: string) => {
  let installId: number | undefined;
  try {
    const uid = zodMongoId.parse(userId);
    console.log("getting install id from cache");
    const cacheInstallId = await redisGet(UserRedisKeys.installId, uid);
    installId = parseInt(cacheInstallId || "");
    // if not in cache, get installation id from github
    if (installId) {
      console.log("install id from cache hit");
      return installId;
    }
    console.log("install id from cache miss");
    const id: UserProps | null = await UserModel.findById(uid)
      .select("githubDetails.installId")
      .lean();
    installId = id?.githubDetails?.installId;
    if (installId) {
      console.log("install id from db hit");
      return installId;
    }
    console.log("install id from db miss");
    return installId;
  } catch (error) {
    console.error("error in getInstallationId", error);
  }
};

export const getInstalledReposFunc = async (
  installationId?: number | string,
  setValue: boolean = true
) => {
  try {
    console.log(" start of getInstalledReposFunc");
    const session: any = await getServerSessionForServer();
    const userId = session?.user?._id;
    const uid = zodMongoId.parse(userId);
    if (!installationId) {
      // try getting repos from cache
      console.log("getting repos from cache", uid);
      const repos = await redisGet(UserRedisKeys.repos, uid);
      if (repos) {
        console.log("repos from cache hit", repos);
        return repos;
      }
    }
    console.log("repos from cache miss");
    const installId: number = zodGithubInstallationId.parse(
      installationId || (await getInstallationId(userId))
    );
    console.log("getting octokit");
    const api = await getOctokit({ installationId: installId });
    if (!(api && api.type === "app")) {
      console.log("error getting octokit");
      throw new Error("Error getting octokit");
    }
    console.log("getting repos");
    const repos = await api.api.request("GET /installation/repositories", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (repos.status !== 200) {
      console.log("error getting repos");
      throw new Error("Error getting repos");
    }
    // filter data needed to be stored in db
    // ? for now lets store just the repo names
    console.log("filtering repos");
    const reposData = repos.data.repositories.map((repo: any) => {
      return repo.full_name;
    });
    if (!setValue) {
      console.log("not setting value");
      return reposData;
    }
    // store repoData in cache
    console.log("storing repos in cache", reposData);
    await redisSet(UserRedisKeys.repos, uid, reposData);
    // store repoData in db
    console.log("storing repos in db");
    await dbConnect();
    await UserModel.findByIdAndUpdate(uid, {
      $set: {
        githubDetails: {
          repos: reposData,
        },
      },
    });
    return reposData;
  } catch (error) {
    console.error("error in getInstalledReposFunc", error);
    return;
  }
};
