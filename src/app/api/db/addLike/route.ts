import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { ProjectModel, LikeModel } from "@/mongodb/models";
import { zodMongoId } from "@/zod/zod.common";

async function handler(req: Request) {
  await dbConnect();

  const { userId, projectId } = await req.json();

  try {
    console.log("started");
    // Find the user
    const uid = zodMongoId.parse(userId);
    const pid = zodMongoId.parse(projectId);

    const like = new LikeModel({
      user: uid,
      project: pid,
    });
    await like.save();

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: pid },
      {
        $inc: { likesCount: 1 }, // Increment likesCount
      },
      { new: true } // Return the updated document
    );

    console.log("done");
    return NextResponse.json({
      message: "Project Liked successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error liking project for user:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export { handler as POST };
