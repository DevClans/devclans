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
    console.log("started");
    // Find the user

    stringSchema.parse(userId);
    stringSchema.parse(projectId);

    if (!isValidObjectId(projectId)) {
      return NextResponse.json({ message: "Invalid project ID" });
    }

    const project = await ProjectModel.findById(projectId);
    const user = await UserModel.findOne({ _id: userId });

    if (!project || !user) {
      return NextResponse.json({ message: "Project or user not found" });
    }

    // Check if the user has already liked the project
    const existingBookmark = await BookmarkModel.findOne({
      user: user._id,
      project: project._id,
    });

    if (existingBookmark) {
      // If remove is true and the like exists, remove the like
      await BookmarkModel.findByIdAndDelete(existingBookmark._id);

      // Update the project's likesCount and likesArray
      const updatedProject = await ProjectModel.findOneAndUpdate(
        { _id: project._id },
        {
          $inc: { bookmarkCount: -1 }, // Decrement likesCount
          $pull: { bookmarkArray: existingBookmark._id }, // Pull the existingBookmark._id from likesArray
        },
        { new: true } // Return the updated document
      );

      console.log("done");

      return NextResponse.json({
        message: "Bookmark removed successfully",
        project: updatedProject,
      });
    } else if (!existingBookmark) {
      // If remove is false and the like doesn't exist, add the like

      return NextResponse.json({
        message: "Bookmark not found",
      });
    } else {
      return NextResponse.json({ message: "Invalid operation" });
    }
  } catch (error) {
    console.error("Error handling like:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export { handler as POST };
