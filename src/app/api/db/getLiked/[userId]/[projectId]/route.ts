import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { ProjectModel, UserModel, LikeModel } from "@/model/schema";



async function handler(req:Request,{ params }:{ params : { userId: string, projectId: string }}) {
    await dbConnect();
    
    const  { userId, projectId }  = params;
    console.log(userId);
  
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

export { handler as GET }