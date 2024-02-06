import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const baseUrl = req.nextUrl.origin + "/user/new";
  try {
    console.log(params.id, "params");
    return NextResponse.redirect(baseUrl + "?error=" + params.id);
  } catch (error) {}
}
