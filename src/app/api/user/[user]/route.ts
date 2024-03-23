import { getOctokit } from "@/github/config.github";
import getGithubReadme from "@/github/repos/gh.getReadme";
import { UserModel } from "@/mongodb/models";
import { redisGet, redisSet } from "@/redis/basicRedis";
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
import { decrypt } from "@/utils/EncryptFunctions";
import dbConnect from "@/utils/mongoose.config";
import {
  zodUserGithubDetailsSchema,
  zodMongoId,
  zodUserDataSchema,
  zodUserSearchInfoSchema,
  zodUserGithubDetailsSchemaForFrontend,
  zodDiscordUsername,
} from "@/zod/zod.common";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const getUserData = async (user: string, select: string) => {
  try {
    const u: UserProps | null = await UserModel.findById(
      new Types.ObjectId(user)
    )
      .select(select || " -githubDetails.accessToken -githubDetails.installId")
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
    let userAccessToken =
      token || (await redisGet(UserRedisKeys.accessToken, userId));
    console.info(
      "getting user github data start=> userAccessTOken",
      Boolean(userAccessToken)
    );
    let githubUsername = "";
    let getreadme = true;
    let getData = true;
    const dataForCache: UserGithubDetailsProps = {} as UserGithubDetailsProps;
    const githubDataFromCache = await redisGet(UserRedisKeys.github, userId);
    if (githubDataFromCache) {
      const data = zodUserGithubDetailsSchema.safeParse(githubDataFromCache);
      if (data.success) {
        console.info("user github cache hit");
        getData = false;
        Object.assign(dataForCache, data.data);
        githubUsername = data.data.login;
        if (data.data.readme) {
          console.info("user github readme cache hit");
          getreadme = false;
        }
      } else {
        console.error("github data cache error", data.error);
      }
    } else {
      console.info("user github cache miss");
    }
    if (!userAccessToken) {
      console.info("getting user access token from mongodb", userId);
      const accessToken: UserProps | null = await UserModel.findById(userId)
        .select("githubDetails.accessToken")
        .lean();
      if (accessToken) {
        console.info("user access token found", accessToken);
        userAccessToken = decrypt(accessToken.githubDetails?.accessToken);
        if (userAccessToken) {
          redisSet(
            UserRedisKeys.accessToken,
            userId,
            userAccessToken,
            3600 * 24 * 365
          );
        }
      }
    }
    if (userAccessToken) {
      // get data from github api
      const githubapi = await getOctokit({ accessToken: userAccessToken });
      if (githubapi && githubapi.type === "auth") {
        console.info("can get data from github api");
        if (getData) {
          console.info("getting user data from github api");
          // get github related data
          const githubData: any = await githubapi.api.request("GET /user", {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
          console.info("user data from github", Boolean(githubData?.data));
          githubUsername = githubData.data.login;
          Object.assign(
            dataForCache,
            zodUserGithubDetailsSchema.partial().parse(githubData.data)
          );
        }
        if (getreadme) {
          // try getting readme from github api
          console.info("getting user github readme from github api");
          const readme = await githubapi.api
            .request("GET /repos/{owner}/{repo}/contents/{path}", {
              owner: githubUsername,
              repo: githubUsername,
              path: "README.md",
              ref: "main",
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            })
            .catch((error) => {
              console.error("error getting readme from github api", error);
              return error;
            });
          console.info("readme from github", readme);
          if (readme.status == 200) {
            getreadme = false;
            const readmeContent = Buffer.from(
              (readme.data as any).content,
              "base64"
            ).toString();
            dataForCache["readme"] = readmeContent;
          }
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
    if (getData || getreadme) {
      // store data
      console.info("adding user github data in cache", dataForCache, userId);
      redisSet(UserRedisKeys.github, userId, dataForCache);
    }
  } catch (error) {
    console.error("error in user getgithubdata", error);
  }
};
const setUseridInCache = async (username: string, id: string) => {
  try {
    console.info("setting userid in cache", username, id);
    await redisSet(UserRedisKeys.ids, username, id, 60 * 60 * 24 * 30); // 30 day as username is not going to change
  } catch (error) {
    console.error("error in setting userid in cache", error);
  }
};
// ? invalidating old username in cache is not necessary as it will expire in 30 days

async function handler(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    await dbConnect();
    console.info(" -- fetching user route -- ");
    const { user } = params;
    const isMongoId = zodMongoId.safeParse(user).success;
    let cachedId;
    if (!isMongoId) {
      console.info("user is not mongo id", user);
      // check if username
      const username = zodDiscordUsername.parse(user);
      // search for id in cache using the username
      cachedId = await redisGet(UserRedisKeys.ids, username);

      // if not found, search in mongodb
      if (!cachedId) {
        console.info("user not found in cache", username, "getting from db");
        const id: UserProps | null = await UserModel.findOne({ username })
          .select("_id")
          .lean();
        if (id) {
          console.info("user found in db", id);
          cachedId = id._id;
          // add to cache
          await setUseridInCache(username, id._id);
        }
      }
    }
    const userId = isMongoId ? user : cachedId;
    console.info("user profile being fetched =>", userId);
    if (!userId) {
      console.info("user not found in cache", userId);
      throw new Error("User not found " + userId);
    }
    // is user in cache? check users key
    const userInfo: UserProps | UserSearchInfoProps | Record<string, any> = {};
    const usersInCacheObj = await redisGet(UserRedisKeys.list, userId);
    const checkUserSearchInfoCache = zodUserSearchInfoSchema
      .partial()
      .safeParse(usersInCacheObj);
    if (checkUserSearchInfoCache.success) {
      console.info("users cache hitt", userId);
      Object.assign(userInfo, checkUserSearchInfoCache.data); // info like: username, avatar, etc
      // * GETTING USER DETAILS
      try {
        // check for user data in cache in userData key
        const userDataObj = await redisGet(UserRedisKeys.data, userId);
        const checkUserDataCache = zodUserDataSchema.safeParse(userDataObj);
        // if user data is in cache, add it to user object
        if (checkUserDataCache.success) {
          console.info("usersdata cache hit");
          Object.assign(userInfo, checkUserDataCache.data);
        } else {
          // get some details
          const u: UserProps | UserSearchInfoProps | null = await getUserData(
            userId,
            "-githubDetails -" +
              userSearchInfoKeys
                .filter((item) => !item.includes("githubDetails"))
                .join(" -")
          ); // to get all fields except userSearchInfoKeys as they already exist in userInfo
          if (!u) {
            // clear user id from cache
            await redisClient.del(UserRedisKeys.ids + ":" + user);
            return NextResponse.json({ message: "User not found " + userId });
          }
          Object.assign(userInfo, u);
          // add to cache
          await redisSet(UserRedisKeys.data, userId, u);
        }
      } catch (error) {
        console.error("error in user details data", error);
      }
    } else {
      console.info("users cache miss", checkUserSearchInfoCache.error);
      // get all details
      const u: UserProps | null = await getUserData(userId, "");
      if (!u) {
        // clear user id from cache
        await redisClient.del(UserRedisKeys.ids + ":" + user);
        return NextResponse.json({ message: "User not found " + userId });
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
