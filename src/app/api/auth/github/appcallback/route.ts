import { urlBase } from "@/constants";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import { getInstalledReposFunc } from "@/utils/getInstalledReposFunc";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "@/mongodb/models";
import redisClient from "@/redis/config";
import { zodGithubInstallationId, zodMongoId } from "@/zod/zod.common";
import { UserRedisKeys } from "@/types/mongo/user.types";
import dbConnect from "@/lib/dbConnect";
import { encrypt } from "@/utils/EncryptFunctions";
import { redisSet } from "@/redis/basicRedis";

// to add user install id and user repos
const handler = async (req: NextRequest) => {
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
          "githubDetails.installId": encrypt(installid.toString()),
          repos,
        },
      }
    );
    console.info("user updated successfully", updatedUser);
    console.log("adding user github data in cache");
    const pipeline = redisClient.pipeline();
    //   setting user repos in cache
    if (Array.isArray(repos) && repos.length) {
      await redisSet(
        UserRedisKeys.repos,
        userId,
        repos,
        3600 * 24 * 365,
        pipeline
      );
    }
    //   setting user install id in cache
    await redisSet(
      UserRedisKeys.installId,
      userId,
      installid,
      3600 * 24 * 365,
      pipeline
    );
    await pipeline.exec();
  } catch (error) {
    console.error("error adding user github data in cache", error);
  }
};
