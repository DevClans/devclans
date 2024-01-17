import { UserModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import { NextRequest, NextResponse } from "next/server";

async function handler(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  await dbConnect();

  const user = params.user;
  if (!user || typeof user !== "string") {
    return NextResponse.json({ message: "Invalid user parameter" });
  }

  const u = await UserModel.findById({
    id: user,
  });

  return NextResponse.json(u);
}

export { handler as GET };
