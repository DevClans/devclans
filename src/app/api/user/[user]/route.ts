import { UserModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function handler(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    await dbConnect();

    const { user } = params;
    if (!user || typeof user !== "string") {
      return NextResponse.json({ message: "Invalid user parameter" });
    }

    const u = await UserModel.findById({
      _id: new Types.ObjectId(user),
    });

    return NextResponse.json(u);
  } catch (error) {
    console.log("error in user route", error);
    return NextResponse.json({ message: "error in user route", error });
  }
}

export { handler as GET };
