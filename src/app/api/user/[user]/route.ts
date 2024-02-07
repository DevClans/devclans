import { getOctokit } from "@/github/config.github";
import getGithubReadme from "@/github/repos/gh.getReadme";
import { UserModel } from "@/mongodb/models";
import redisClient from "@/redis/config";
import updateAllCache from "@/redis/updateUserCache";
import { projectSearchItemKeys } from "@/types/mongo/project.types";
import {
  UserGithubDetailsProps,
  UserProps,
  UserRedisKeys,
  UserSearchInfoProps,
  userSearchInfoKeys,
} from "@/types/mongo/user.types";
import dbConnect from "@/utils/mongoose.config";
import {
  zodUserGithubDetailsSchema,
  zodMongoId,
  zodUserDataSchema,
  zodUserSearchInfoSchema,
  zodUserGithubDetailsSchemaForFrontend,
} from "@/zod/zod.common";
import { Types, get } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const getUserData = async (user: string, select: string) => {
  try {
    const u: UserProps | null = await UserModel.findById(
      new Types.ObjectId(user)
    )
      .select(select)
      .populate("ownedProjects", projectSearchItemKeys.join(" "))
      // TODO get only ids and check in cache and then get missing data if load increases
      .lean();
    // console.info("user data from getUserData", u);
    return u;
  } catch (error) {
    throw error;
  }
};

const getGithubData = async (userId: string, userInfo: any, token?: string) => {
  try {
    userInfo["githubDetails"] = userInfo["githubDetails"] || {};
    let userAccessToken = token;
    console.info("getting user github data start");
    let githubUsername = "";
    let getreadme = true;
    let getData = true;
    const dataForCache: UserGithubDetailsProps = {} as UserGithubDetailsProps;
    const githubDataFromCache = await redisClient.hget(
      UserRedisKeys.github,
      userId
    );
    if (githubDataFromCache) {
      const data = zodUserGithubDetailsSchema.safeParse(
        JSON.parse(githubDataFromCache)
      );
      if (data.success) {
        console.info("user github cache hit");
        getData = false;
        if (!userAccessToken) {
          userAccessToken = data.data.accessToken;
        }
        Object.assign(dataForCache, data.data);
        githubUsername = data.data.login;
        if (data.data.readme) {
          getreadme = false;
        }
      } else {
        console.error("github data cache error", data.error);
      }
    } else {
      console.info("user github cache miss");
    }
    if (!userAccessToken) {
      console.info("getting user access token from mongodb");
      const accessToken: UserProps | null = await UserModel.findById(userId)
        .select("githubDetails.accessToken")
        .lean();
      if (accessToken) {
        console.info("user access token found", accessToken);
        userAccessToken = accessToken.githubDetails?.accessToken;
        // TODO encrypt access token for cache
        dataForCache["accessToken"] = userAccessToken;
      }
    }
    if (userAccessToken) {
      console.info("getting data from github api");
      // get data from github api
      const githubapi = await getOctokit({ accessToken: userAccessToken });
      if (githubapi && githubapi.type === "auth") {
        if (getData) {
          // get github related data
          const githubData: any = await githubapi.api.request("GET /user", {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          console.info("user data from github", githubData);
          githubUsername = githubData.data.login;
          Object.assign(
            dataForCache,
            zodUserGithubDetailsSchema.partial().parse(githubData.data)
          );
        }
        // try getting readme from github api
        console.info("getting user github readme from github api");
        const readme = await githubapi.api.request(
          "GET /repos/{owner}/{repo}/contents/{path}",
          {
            owner: githubUsername,
            repo: githubUsername,
            path: "README.md",
            ref: "main",
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        console.info("readme from github", readme);
        if (readme.status == 200) {
          getreadme = false;
          const readmeContent = Buffer.from(
            (readme.data as any).content,
            "base64"
          ).toString();
          dataForCache["readme"] = readmeContent;
        }
      } else console.error("error getting github api");
    } else
      console.info(
        "not getting data from github api. missing userAccessToken",
        userAccessToken
      );

    if (getreadme && githubUsername) {
      console.info("getting user github readme");
      // get github readme
      const readme = await getGithubReadme({ username: githubUsername });
      if (readme) {
        console.info("user github readme found", readme);
        // add readme to dataset
        dataForCache["readme"] = readme;
      } else {
        console.error("user github readme not found");
      }
    }
    Object.assign(
      userInfo["githubDetails"],
      zodUserGithubDetailsSchemaForFrontend.parse(dataForCache)
    );
    // store data
    console.info("adding user github data in cache", dataForCache, userId);
    redisClient.hset(
      UserRedisKeys.github,
      userId,
      JSON.stringify(dataForCache)
    );
    redisClient.expire(UserRedisKeys.github, 60 * 60 * 24 * 1); // 1 day
  } catch (error) {
    console.error("error in user getgithubdata", error);
  }
};

async function handler(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    await dbConnect();
    console.info(" -- fetching user route -- ");
    const { user } = params;
    const userId = zodMongoId.parse(user);
    console.info("userId", userId);
    // is user in cache? check users key
    const userInfo: UserProps | UserSearchInfoProps | Record<string, any> = {};
    const userInCache = await redisClient.hget(UserRedisKeys.list, userId);
    const usersInCacheObj =
      typeof userInCache == "string" && JSON.parse(userInCache);
    const checkUserSearchInfoCache = zodUserSearchInfoSchema
      .partial()
      .safeParse(usersInCacheObj);
    if (checkUserSearchInfoCache.success) {
      console.info("users cache hitt", checkUserSearchInfoCache.data);
      Object.assign(userInfo, checkUserSearchInfoCache.data); // info like: username, avatar, etc
      // * GETTING USER DETAILS
      try {
        // check for user data in cache in userData key
        const userData = await redisClient.hget(UserRedisKeys.data, userId);
        const userDataObj = JSON.parse(userData || "");
        const checkUserDataCache = zodUserDataSchema.safeParse(userDataObj);
        // if user data is in cache, add it to user object
        if (checkUserDataCache.success) {
          console.info("usersdata cache hit");
          Object.assign(userInfo, checkUserDataCache.data);
        } else {
          // get some details
          const u: UserProps | UserSearchInfoProps | null = await getUserData(
            userId,
            "-" + userSearchInfoKeys.join(" -")
          ); // to get all fields except userSearchInfoKeys as they already exist in userInfo
          if (!u) {
            return NextResponse.json({ message: "User not found" });
          }
          Object.assign(userInfo, u);
          // add to cache
          redisClient.hset(UserRedisKeys.data, userId, JSON.stringify(u));
          redisClient.expire("usersData", 60 * 60 * 24 * 7); // 1 week
        }
      } catch (error) {
        console.error("error in user details data", error);
        throw error;
      }
    } else {
      console.info("users cache miss", checkUserSearchInfoCache.error);
      // get all details
      const u: UserProps | null = await getUserData(userId, "");
      if (!u) {
        return NextResponse.json({ message: "User not found" });
      }
      Object.assign(userInfo, u);
      // add to cache by separating userSearchInfoKeys and other keys
      console.log("adding user data in cache");
      await updateAllCache(userId, u);
    }
    // * GETTING USER GITHUB DETAILS
    console.log("getting user github details");
    const githubAccessToken: string | undefined =
      userInfo["githubDetails"]?.accessToken;
    await getGithubData(userId, userInfo, githubAccessToken);

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error("error in user route", error);
    return NextResponse.json({ message: "error in user route", error });
  }
}

export { handler as GET };
