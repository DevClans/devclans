import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  const body = await req.json();
  console.log("body", body);
  return NextResponse.json({ message: "Hello, World!" });
};

export { handler as GET, handler as POST };
