import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const handle = async (req: NextRequest) => {
  try {
    console.log(" start of github/connect");
    const clientID = z.string().parse(process.env.AUSPY_GITHUB_CLIENT_ID);
    const redirect_uri = z
      .string()
      .startsWith("http")
      .max(150)
      .parse(process.env.AUSPY_GITHUB_REDIRECT_URI);
    const baseUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirect_uri}`;
    // return res.redirect(baseUrl);

    return NextResponse.redirect(baseUrl);
  } catch (error) {
    console.error(
      "error in github/connect",
      // error,
      req.nextUrl.origin + "/github_connect/error"
    );
    return NextResponse.json(
      { message: "error in github/connect", error },
      {
        status: 500,
      }
    );
  }
};
export { handle as GET };
