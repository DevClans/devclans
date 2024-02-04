import { NextResponse } from "next/server";
import { stringSchema, zodMongoId } from "@/zod/zod.common";
import dbConnect from "@/lib/dbConnect";
import { UserModel, BookmarkModel } from "@/mongodb/models";
import { LikeModel } from "@/mongodb/models";
import { Types } from "mongoose";
import getIdsFromCacheOrDb from "@/utils/getIdsFromCacheOrDb";

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
    // const u = await UserModel.findOne({ _id: new Types.ObjectId(userId) });

    // if (!u) {
    //   return NextResponse.json({ message: "User or Project not found" });
    // }
    const model = type === "likes" ? LikeModel : BookmarkModel;
    const idsFromDb = await model
      .find({
        user: new Types.ObjectId(userId),
      })
      .select("project")
      .lean();
    const ids = idsFromDb.map((id) => id.project.toString());
    // fetch project data from cache
    const { resData } = await getIdsFromCacheOrDb({
      idsToGet: ids,
      type: "projects",
      getProjectsFromDb: false,
    });
    return NextResponse.json(resData);
    // if not in cache, fetch from db and store in cache
  } catch (error) {
    return NextResponse.json(error);
  }
}

export { handler as GET };
