import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel, ProjectModel, BookmarkModel } from "@/mongodb/models";
import {
  stringSchema,
  zodProjectFormSchema,
  likeAndBkMarkSchema,
} from "@/zod/zod.common";
import { isValidObjectId } from "mongoose";

async function handler(req: Request) {
  await dbConnect();

  const { userId, projectId } = await req.json();

  try {
    stringSchema.parse(userId);
    stringSchema.parse(projectId);
    if (!isValidObjectId(projectId)) {
      return NextResponse.json({ message: 'Invalid project ID' });
    }

    const project = await ProjectModel.findById(projectId);
    const user: any = await UserModel.findOne({ _id: userId });
    

    if (!project || !user) {
      return NextResponse.json({ message: "Project or user not found" });
    }

    const bookmark = new BookmarkModel({
      user: user._id,
      project: project._id,
    });
    await bookmark.save();
   
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: project._id },
      {
        $inc: { bookmarkCount: 1 }, // Increment likesCount
       
      },
      { new: true } // Return the updated document
    );

    

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
