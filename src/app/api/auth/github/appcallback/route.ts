import { urlBase } from "@/constants";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { getInstalledReposFunc } from "@/utils/getInstalledReposFunc";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/mongodb/models";
import redisClient from "@/redis/config";
import { zodGithubInstallationId, zodMongoId } from "@/zod/zod.common";
import { UserRedisKeys } from "@/types/mongo/user.types";
import dbConnect from "@/lib/dbConnect";

// to add user install id and user repos
export const handler = async (req: NextRequest) => {
  try {
    console.log(" start of github/appcallback");
    // const code = req.nextUrl.searchParams.get("code");
    const installId = zodGithubInstallationId.parse(
      req.nextUrl.searchParams.get("installation_id")
    );
    console.log("found installId", installId);
    // const setupAction = req.nextUrl.searchParams.get("setup_action");
    const session: any = await getServerSessionForServer();
    const userId = zodMongoId.parse(session?.user?._id);
    // get installed repos
    const reposData = await getInstalledReposFunc(installId, false);
    // get user profile
    await updateData(userId, installId, reposData);
    console.log("success of github/appcallback, redirecting");
    return NextResponse.redirect(urlBase + "/github_connect");
  } catch (error: any) {
    console.error("error in github/appcallback", error);
    return NextResponse.redirect(urlBase + "/github_connect/error");
  }
};
export { handler as GET };

const updateData = async (userId: string, installid: number, repos: any) => {
  try {
    console.log("updating user github details");
    await dbConnect();
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          "githubDetails.installId": installid,
          repos,
        },
      }
    );
    console.info("user updated successfully", updatedUser);
    console.log("adding user github data in cache");
    const pipeline = redisClient.pipeline();
    //   setting user repos in cache
    if (Array.isArray(repos) && repos.length) {
      pipeline.set(UserRedisKeys.repos + ":" + userId, JSON.stringify(repos));
    }
    //   setting user install id in cache
    pipeline.set(
      UserRedisKeys.installId + ":" + userId,
      JSON.stringify(installid)
    );
    //   setting expiry for all keys
    pipeline.expire(UserRedisKeys.installId + ":" + userId, 60 * 60 * 24 * 365); // 1 year
    pipeline.expire(UserRedisKeys.repos + ":" + userId, 60 * 60 * 24 * 365); // 1 year. no need to change frequently
    await pipeline.exec();
  } catch (error) {
    console.error("error adding user github data in cache", error);
  }
};
