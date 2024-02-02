import { NextResponse } from 'next/server';
import  { stringSchema, userSchema, projectSchema } from "@/zod/zod.common"
import dbConnect from '@/lib/dbConnect';
import { ProjectModel, UserModel, BookmarkModel } from "@/model/schema";



async function handler(req:Request,{ params }:{ params : { userId: string }}) {
  try{
    await dbConnect();
    
    const  { userId }  = params;
    stringSchema.parse(userId);

  
    if (!userId || typeof userId !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }
      const u = await UserModel.findOne({_id:userId});


  
    

      if(!u ){
        return NextResponse.json({ message: 'User or Project not found' });
      }
   
    const likes =  await BookmarkModel.find({

          user : u._id
 
      });
      console.log(likes)
     
      return  NextResponse.json(likes);
    }
    catch(error){
      return NextResponse.json(error);
    }
}

export { handler as GET }