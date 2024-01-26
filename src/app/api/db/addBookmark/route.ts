import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel, ProjectModel, BookmarkModel } from "@/mongodb/models";
import {
  stringSchema,
  projectSchema,
  likeAndBkMarkSchema,
} from "@/zod/zod.common";

async function handler(req: Request) {
  await dbConnect();

  const { userId, projectId } = await req.json();

  try {
    stringSchema.parse(userId);
    stringSchema.parse(projectId);
    const project = await ProjectModel.findOne({ title: projectId });
    const user = await UserModel.findOne({ username: userId });

    if (!project || !user) {
      return NextResponse.json({ message: "Project or user not found" });
    }

    const bookmark = new BookmarkModel({
      user: user._id,
      project: project._id,
    });
    await bookmark.save();
    likeAndBkMarkSchema.parse(bookmark);
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: project._id },
      {
        $inc: { bookmarkCount: 1 }, // Increment likesCount
        $push: { bookmarkArray: bookmark._id }, // Push like._id to likesArray
      },
      { new: true } // Return the updated document
    );

    projectSchema.parse(updatedProject);

    return NextResponse.json({
      message: "Project Liked successfully",
      user: updatedProject,
    });
  } catch (error) {
    console.error("Error liking project for user:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export { handler as POST };
