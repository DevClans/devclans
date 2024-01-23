import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel, ProjectModel, LikeModel } from "@/model/schema";
import  { stringSchema, stringArraySchema } from "@/zod/zod.common"



async function handler(req: Request) {
  await dbConnect();

  const { userId, skills } = await req.json();

  try {
 
    console.log("started");
    // Find the user
    stringSchema.parse(userId);
    stringArraySchema.parse(skills);
  
    const user = await UserModel.findOne({ username: userId});

    if ( !user) {
      return NextResponse.json({ message: 'Project or user not found' });
    }


    const updatedUser = await UserModel.findOneAndUpdate(
        { username: userId },
        {
        
          $push: { skills: skills } // Push like._id to likesArray
        },
        { new: true } // Return the updated document
      );
    
console.log("done");
    return NextResponse.json({
      message: 'Project Liked successfully',
       user: updatedUser,
    });
  
 
  } catch (error) {
    console.error('Error liking project for user:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

export { handler as POST };
