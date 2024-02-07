import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import redisClient from "@/redis/config";
import { UserRedisKeys } from "@/types/mongo/user.types";
import { zodUserGithubDetailsSchema } from "@/zod/zod.common";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const userid = req.nextUrl.searchParams.get("userid");
  const newParams = new URLSearchParams();
  const baseUrl = req.nextUrl.origin + "/user/" + userid;
  try {
    newParams.set("mode", "edit");
    // console.log(code, "code", userid, "userid");
    if (!code) {
      console.error("code not found");
      newParams.set("error", "code_not_found");
      return NextResponse.redirect(baseUrl + "?" + newParams.toString());
    }

    const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
    console.log(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, "tokens");
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      console.error("vars not set");
      newParams.set("error", "vars_not_set");
      return NextResponse.redirect(baseUrl + "?" + newParams.toString());
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
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("access token not found");
      newParams.set("error", "access_token_not_found");
      return NextResponse.redirect(baseUrl + "?" + newParams.toString());
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
      newParams.set("error", "userid_not_found");
      return NextResponse.redirect(baseUrl + "?" + newParams.toString());
    }
    console.log("updating user github details");
    await dbConnect();
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userid },
      {
        $set: {
          githubId: userProfile.login,
          githubDetails: { ...userProfile, accessToken: accessToken },
        },
      },

      { new: true } // Return the updated document
    );
    console.info("user updated successfully");
    // add user data in cache
    try {
      console.log("trying to add user data in cache");
      const githubData = zodUserGithubDetailsSchema.safeParse(
        updatedUser.githubDetails
      );
      if (githubData.success) {
        console.log("adding user github data in cache");
        await redisClient.hset(
          UserRedisKeys.github,
          userid,
          JSON.stringify(githubData.data)
        );
      } else {
        console.error("github data not valid", githubData.error);
      }
    } catch (error) {
      console.error("error adding user github data in cache", error);
    }

    console.log(updatedUser, "user");
    newParams.set("githubUsername", userProfile.login);
    const redirectUrl = `${baseUrl}?${newParams.toString()}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.log(error, "error");
    return NextResponse.redirect(baseUrl + "?error=internal_error");
  }
}
