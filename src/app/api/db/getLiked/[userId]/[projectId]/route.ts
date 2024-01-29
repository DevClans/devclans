import { NextResponse } from "next/server";
import {
  stringSchema,
  userSchema,
  zodProjectFormSchema,
} from "@/zod/zod.common";
import dbConnect from "@/lib/dbConnect";
import { ProjectModel, UserModel, LikeModel } from "@/model/schema";

async function handler(
  req: Request,
  { params }: { params: { userId: string; projectId: string } }
) {
  try {
    await dbConnect();

    const { userId, projectId } = params;
    stringSchema.parse(userId);
    stringSchema.parse(projectId);

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ message: "Invalid user parameter" });
    }
    const u = await UserModel.findOne({ username: userId });
    userSchema.parse(u);
    const p = await ProjectModel.findOne({ title: projectId });
    zodProjectFormSchema.parse(p);

    if (!u || !p) {
      return NextResponse.json({ message: "User or Project not found" });
    }

    const likes = await LikeModel.find({
      user: u._id,
      project: p._id,
    });

    return NextResponse.json(likes);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export { handler as GET };
