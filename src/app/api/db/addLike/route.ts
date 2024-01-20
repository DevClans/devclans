import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel, ProjectModel, LikeModel } from "@/model/schema";
import { z } from 'zod';



async function handler(req: Request) {
  await dbConnect();

  const { userId, projectId } = await req.json();
  const stringSchema = z.string();
  const integerSchema = z.number();
  const stringArray = z.string().optional().array();

 var x = stringSchema.parse(userId);
 var y =  stringSchema.parse(projectId)
  const dateSchema = z.date();
  const projectSchema = z.object({
    "problem": stringSchema,
    "challenges": stringArray,
    "futureGoals": stringArray,
    "memberReq": stringArray
  });

  const objectSchema = z.object(
    {
   "projectDetails":projectSchema,
  
  "title": stringSchema,
  "desc": stringSchema,
  "topics": stringArray,
  "githubLink": stringSchema,
  "likesCount": integerSchema,

  "bookmarkCount": integerSchema,
  "projectLinks": stringArray,
  "team": stringArray,
  "imgs": stringArray,
  "devStage": stringSchema,
  "createdAt": dateSchema,
  "updatedAt": dateSchema,
  "__v": integerSchema
}
  );
  try {
    if(x && y){
    console.log("started");
    // Find the user
    const project = await ProjectModel.findOne({ title: projectId });
    const user = await UserModel.findOne({ username: userId});

    if (!project || !user) {
      return NextResponse.json({ message: 'Project or user not found' });
    }

    var count = project.likesCount;
    count ++;
    const like = new LikeModel({
        user: user._id,
        project: project._id
    })
    await like.save();
    const updatedProject = await ProjectModel.findOneAndUpdate(
        { _id: project._id },
        {
          $inc: { likesCount: 1 }, // Increment likesCount
          $push: { likesArray: like._id } // Push like._id to likesArray
        },
        { new: true } // Return the updated document
      );
      objectSchema.parse(updatedProject);
console.log("done");
    return NextResponse.json({
      message: 'Project Liked successfully',
       user: updatedProject,
    });
  }
  else{
    return NextResponse.json({ message: 'Wrong Type' });
  }
  } catch (error) {
    console.error('Error liking project for user:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}

export { handler as POST };
