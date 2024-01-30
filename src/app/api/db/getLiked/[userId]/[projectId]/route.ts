import { NextResponse } from "next/server";
import {
  stringSchema,
  userSchema,
  zodProjectFormSchema,
} from "@/zod/zod.common";
import dbConnect from "@/lib/dbConnect";
import { ProjectModel, UserModel, LikeModel } from "@/model/schema";
import { isValidObjectId } from 'mongoose';



async function handler(req:Request,{ params }:{ params : { userId: string, projectId: string }}) {
  try{
    await dbConnect();

    const { userId, projectId } = params;
    stringSchema.parse(userId);
    stringSchema.parse(projectId);
  
    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }
      if (!isValidObjectId(projectId)) {
        return NextResponse.json({ message: 'Invalid project ID' });
      }
  
      const project = await ProjectModel.findById(projectId);
      const u = await UserModel.findOne({username:userId})

    

      if(!u ){
        return NextResponse.json({ message: 'User not found' });
      }
   
    const likes =  await LikeModel.find({

          user : u._id,
          project: projectId
 
      });
      
     
      return  NextResponse.json(likes);
    }
    catch(error){
      return NextResponse.json(error);
    }
}

export { handler as GET };
