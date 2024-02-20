import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    console.log("weboook =>", req, req.nextUrl, req.body);
    return NextResponse.json({ message: "Hello, World!" });
  } catch {}
};
export { handler as POST, handler as GET };
