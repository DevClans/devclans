import { getOctokit } from "@/github/config.github";
import getGithubReadme from "@/github/repos/gh.getReadme";
import { UserModel } from "@/mongodb/models";
import redisClient from "@/redis/config";
import {
  UserProps,
  UserRedisKeys,
  UserSearchInfoProps,
  userGithubDetailsKeys,
  userSearchInfoKeys,
} from "@/types/mongo/user.types";
import dbConnect from "@/utils/mongoose.config";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const getUserData = async (user: string, select: string) => {
  try {
    const u: UserProps | UserSearchInfoProps | null = await UserModel.findById(
      new Types.ObjectId(user)
    )
      .select(select)
      .lean();
    return u;
  } catch (error) {
    throw error;
  }
};

const getGithubData = async (
  userId: string,
  userInfo: any,
  userAccessToken?: string
) => {
  try {
    let getData = true;
    const githubData = await redisClient.hget(
      UserRedisKeys.usersGithub,
      userId
    );
    if (githubData) {
      Object.assign(userInfo["githubDetails"], JSON.parse(githubData));
      // check if it contains all fields
      // TODO add zod check here
      for (const key of userGithubDetailsKeys) {
        if (!userInfo[key]) {
          getData = true;
          break;
        }
      }
    }
    if (getData && userAccessToken) {
      // get data from github api
      const githubapi = await getOctokit({ accessToken: userAccessToken });
      if (!githubapi) {
        console.error("error getting github api");
        return;
      }
      // get github related data
      const githubData: any = await githubapi.request("GET /user", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      const githubUsername = githubData.data.username;
      // get github readme
      const readme = getGithubReadme({ username: githubUsername });
      if (readme) {
        // add readme to dataset
        userInfo["githubDetails"]["readme"] = readme;
      }
      console.info("githubData", githubData);
      const skipKeys = ["accessToken", "refreshToken"];
      for (const key of userGithubDetailsKeys) {
        if (githubData.data[key] && !skipKeys.includes(key)) {
          userInfo["githubDetails"][key] = githubData.data[key];
        }
      }
      // store data
      redisClient.hset(
        UserRedisKeys.usersGithub,
        userId,
        JSON.stringify(userInfo["githubDetails"])
      );
      redisClient.expire(UserRedisKeys.usersGithub, 60 * 60 * 24 * 1); // 1 day
    } else {
      if (getData) {
        console.error("error getting github api");
      } else {
        console.info("user github cache hit");
      }
    }
  } catch (error) {
    // console.error("error in user github data", error);
  }
};

async function handler(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    await dbConnect();

    const { user: userId } = params;
    // TODO add zod check here
    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ message: "Invalid user parameter" });
    }
    // is user in cache? check users key
    const userInfo: UserProps | UserSearchInfoProps | Record<string, any> = {};
    const userInCache = await redisClient.hget(UserRedisKeys.users, userId);
    Object.assign(userInfo, userInCache ? JSON.parse(userInCache) : {}); // info like: username, avatar, etc
    if (userInCache) {
      console.info("users cache hit");
      // * GETTING USER DETAILS
      try {
        // check for user data in cache in userData key
        const userData = await redisClient.hget(
          UserRedisKeys.usersData,
          userId
        );
        // if user data is in cache, add it to user object
        if (userData) {
          console.info("usersdata cache hit");
          Object.assign(userInfo, JSON.parse(userData));
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
          redisClient.hset(UserRedisKeys.usersData, userId, JSON.stringify(u));
          redisClient.expire("usersData", 60 * 60 * 24 * 7); // 1 week
        }
      } catch (error) {
        console.error("error in user details data", error);
        throw error;
      }
      // * GETTING USER GITHUB DETAILS
      const githubAccessToken: string | undefined =
        userInfo["githubDetails"]?.accessToken;
      await getGithubData(userId, userInfo, githubAccessToken);
    } else {
      // get all details
      const u: UserProps | UserSearchInfoProps | null = await getUserData(
        userId,
        ""
      );
      if (!u) {
        return NextResponse.json({ message: "User not found" });
      }
      Object.assign(userInfo, u);
      // add to cache by separating userSearchInfoKeys and other keys
      const userDetailsData: any = {};
      const userSearchInfoData: any = {};
      for (const key of Object.keys(userInfo)) {
        if (userSearchInfoKeys.includes(key)) {
          userSearchInfoData[key] = userInfo[key];
        } else {
          userDetailsData[key] = userInfo[key];
        }
      }
      redisClient.hset(
        UserRedisKeys.users,
        userId,
        JSON.stringify(userSearchInfoData)
      );
      redisClient.expire(UserRedisKeys.users, 60 * 60 * 24 * 7); // 1 week
      redisClient.hset(
        UserRedisKeys.usersData,
        userId,
        JSON.stringify(userDetailsData)
      );
      redisClient.expire(UserRedisKeys.usersData, 60 * 60 * 24 * 7); // 1 week
    }

    // if yes, return from cache

    return NextResponse.json(userInfo);
  } catch (error) {
    console.error("error in user route", error);
    return NextResponse.json({ message: "error in user route", error });
  }
}

export { handler as GET };
