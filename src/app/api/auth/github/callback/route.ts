import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { redisSet } from "@/redis/basicRedis";
import redisClient from "@/redis/config";
import { UserProps, UserRedisKeys } from "@/types/mongo/user.types";
import { encrypt } from "@/utils/EncryptFunctions";
import getServerSessionForServer from "@/utils/auth/getServerSessionForApp";
import {
  zodMongoId,
  zodUserGithubDetailsSchema,
  zodUserSearchInfoSchema,
} from "@/zod/zod.common";
import { NextRequest, NextResponse } from "next/server";

// to add user github id and user github details and access token
export async function GET(req: NextRequest) {
  try {
    console.log("start of github/callback");
    const code = req.nextUrl.searchParams.get("code");
    const session: any = await getServerSessionForServer();
    const userid = zodMongoId.parse(session?.user?._id);
    // console.log(code, "code", userid, "userid");
    if (!code) {
      console.error("code not found");
      throw new Error("code not found");
    }

    const GITHUB_CLIENT_ID = process.env.AUSPY_GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.AUSPY_GITHUB_CLIENT_SECRET;
    // console.log(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, "tokens");
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      console.error("vars not set");
      throw new Error("env vars not set");
    }

    // Exchange the code for a token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    console.log(tokenData, "tokenData");
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("access token not found");
      throw new Error("access token not found");
    }
    // Fetch user profile
    const userProfileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = await userProfileResponse.json();

    // Redirect back to the new user page with the GitHub username as a query parameter
    // console.log(userProfile, "userProfile");
    // send user github data to mongodb
    if (!userid) {
      console.error("userid not found");
      throw new Error("userid not found");
    }
    // use access token to fetch user readme as well
    console.log("fetching user readme");
    const userReadme = await fetch(
      `https://api.github.com/repos/${userProfile.login}/${userProfile.login}/contents/README.md`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const readmeData = await userReadme.json();
    console.log(readmeData, "readmeData");
    const updateData: Partial<UserProps> = {
      githubId: userProfile.login,
      githubDetails: { ...userProfile, accessToken: encrypt(accessToken) },
    };
    if (readmeData?.content) {
      console.log("updating readme content");
      const readmeContent = Buffer.from(
        readmeData.content,
        "base64"
      ).toString();
      if (typeof readmeContent == "string") {
        (updateData["githubDetails"] as any)["readme"] = readmeContent;
      }
    }
    console.log("updating user github details");
    await dbConnect();
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userid },
      {
        $set: updateData,
      },

      { new: true } // Return the updated document
    );
    console.info("user updated successfully");
    // add user data in cache
    try {
      console.log("trying to add user data in cache");
      const githubData = zodUserGithubDetailsSchema
        .partial()
        .safeParse(updatedUser.githubDetails);
      if (githubData.success) {
        console.log("adding user github data in cache");
        const pipeline = redisClient.pipeline();
        // setting user search info in cache
        await redisSet(
          UserRedisKeys.list,
          userid,
          zodUserSearchInfoSchema.partial().parse(updatedUser),
          60 * 60 * 3,
          pipeline
        );
        // setting user github data in cache
        await redisSet(
          UserRedisKeys.github,
          userid,
          githubData.data,
          60 * 60 * 3,
          pipeline
        );
        // setting user access token in cache
        await redisSet(
          UserRedisKeys.accessToken,
          userid,
          accessToken,
          60 * 60 * 24 * 365,
          pipeline
        );
        await pipeline.exec();
      } else {
        console.error("github data not valid", githubData.error);
      }
    } catch (error) {
      console.error("error adding user github data in cache", error);
    }

    console.log(updatedUser, "user");
    const redirectUrl = req.nextUrl.origin + `/github_connect/success`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.log(error, "error");
    return NextResponse.redirect(req.nextUrl.origin + "/github_connect/error");
  }
}
