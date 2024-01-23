import { NextResponse } from 'next/server';
import  { stringSchema } from "@/zod/zod.common"
import dbConnect from '@/lib/dbConnect';
import { ProjectModel, UserModel, LikeModel } from "@/model/schema";



async function handler(req:Request,{ params }:{ params : { userId: string, projectId: string }}) {
  try{
    await dbConnect();
    
    const  { userId, projectId }  = params;
    stringSchema.parse(userId);
    stringSchema.parse(projectId);
  
    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }
      const u = await UserModel.find({username:userId})
      const p = await ProjectModel.find({title:projectId})
      if(!u || !p){
        return NextResponse.json({ message: 'User or Project not found' });
      }
      console.log(u[0]._id)
   
    const likes =  await LikeModel.find({

          user : u[0]._id,
          project: p[0]._id
 
      });
      
     
      return  NextResponse.json(likes);
    }
    catch(error){
      return NextResponse.json(error);
    }
}

export { handler as GET }