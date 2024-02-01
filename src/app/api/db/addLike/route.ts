import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel, ProjectModel, LikeModel } from "@/mongodb/models";
import {
  stringSchema,
  zodProjectFormSchema,
  likeAndBkMarkSchema,
} from "@/zod/zod.common";
import { Types, isValidObjectId } from "mongoose";

async function handler(req: Request) {
  await dbConnect();

  const { userId, projectId } = await req.json();

  try {
    console.log("started");
    // Find the user
    stringSchema.parse(userId);
    stringSchema.parse(projectId);
    if (!isValidObjectId(projectId)) {
      return NextResponse.json({ message: "Invalid project ID" });
    }

    const project = await ProjectModel.findById(projectId);
    console.log(project);

    const user = await UserModel.findOne({ _id: userId });
    console.log(user);

    if (!project || !user) {
      return NextResponse.json({ message: "Project or user not found" });
    }

    var count = project.likesCount;
    count++;
    const like = new LikeModel({
      user: user._id,
      project: project._id,
    });
    await like.save();

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: project._id },
      {
        $inc: { likesCount: 1 }, // Increment likesCount
        $push: { likesArray: like._id }, // Push like._id to likesArray
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
