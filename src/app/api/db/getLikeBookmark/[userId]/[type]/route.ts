import { NextResponse } from "next/server";
import { stringSchema, zodMongoId } from "@/zod/zod.common";
import dbConnect from "@/lib/dbConnect";
import { UserModel, BookmarkModel } from "@/mongodb/models";
import { LikeModel } from "@/mongodb/models";

async function handler(
  req: Request,
  { params }: { params: { userId: string; type: string } }
) {
  try {
    await dbConnect();

    const { userId, type } = params;
    zodMongoId.parse(userId);
    stringSchema.parse(type);

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ message: "Invalid user parameter" });
    }
    const u = await UserModel.findOne({ _id: userId });

    if (!u) {
      return NextResponse.json({ message: "User or Project not found" });
    }

    if (type === "Like") {
      const likes = await LikeModel.find({
        user: u._id,
      });
      console.log(likes);

      return NextResponse.json(likes);
    }

    if (type === "Bookmark") {
      const likes = await BookmarkModel.find({
        user: u._id,
      });
      console.log(likes);

      return NextResponse.json(likes);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export { handler as GET };
