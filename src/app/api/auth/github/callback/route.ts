import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const baseUrl = req.nextUrl.origin + "/user/new";
  try {
    const code = req.nextUrl.searchParams.get("code");
    const userid = req.nextUrl.searchParams.get("userid");
    console.log(code, "code", userid, "userid");
    if (!code) {
      return NextResponse.redirect(baseUrl + "?error=code_not_found");
    }

    const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
    console.log(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, "tokens");
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
      return NextResponse.redirect(baseUrl + "?error=vars_not_set");
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
      return NextResponse.redirect(baseUrl + "?error=access_token_not_found");
    }

    // Fetch user profile
    const userProfileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userProfile = await userProfileResponse.json();

    // Redirect back to the new user page with the GitHub username as a query parameter
    console.log(userProfile, "userProfile");
    // send user github data to mongodb
    if (!userid) {
      return NextResponse.redirect(baseUrl + "?error=userid_not_found");
    }
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

    console.log(updatedUser, "user");
    const redirectUrl = `${baseUrl}?githubUsername=${encodeURIComponent(
      userProfile.login
    )}`;
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.log(error, "error");
    return NextResponse.redirect(baseUrl + "?error=internal_error");
  }
}
