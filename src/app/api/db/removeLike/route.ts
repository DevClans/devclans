import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel, ProjectModel, LikeModel } from "@/model/schema";
import  { stringSchema, projectSchema, likeSchema } from "@/zod/zod.common"

async function handler(req: Request) {
  await dbConnect();

  const { userId, projectId} = await req.json();

  try {
    console.log("started");
    // Find the user
    stringSchema.parse(userId);
    stringSchema.parse(projectId);

    const project = await ProjectModel.findOne({ title: projectId });
    const user = await UserModel.findOne({ username: userId });

    if (!project || !user) {
      return NextResponse.json({ message: 'Project or user not found' });
    }

    // Check if the user has already liked the project
    const existingLike = await LikeModel.findOne({ user: user._id, project: project._id });

    if (existingLike) {
      // If remove is true and the like exists, remove the like
      await LikeModel.findByIdAndDelete(existingLike._id);
      likeSchema.parse(existingLike);

      // Update the project's likesCount and likesArray
      const updatedProject = await ProjectModel.findOneAndUpdate(
        { _id: project._id },
        {
          $inc: { likesCount: -1 }, // Decrement likesCount
          $pull: { likesArray: existingLike._id } // Pull the existingLike._id from likesArray
        },
        { new: true } // Return the updated document
      );

      console.log("done");
        projectSchema.parse(updatedProject);
      return NextResponse.json({
        message: 'Like removed successfully',
        project: updatedProject,
      });
    } else if ( !existingLike) {
      // If remove is false and the like doesn't exist, add the like
    

  
      return NextResponse.json({
        message: 'Like not found',
       
      });
    } else {
      return NextResponse.json({ message: 'Invalid operation' });
    }
  } catch (error) {
    console.error('Error handling like:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

export { handler as POST };
