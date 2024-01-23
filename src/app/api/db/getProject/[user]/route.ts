import { NextResponse } from 'next/server';
import  { stringSchema } from "@/zod/zod.common"
import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { user: string }}) {
  try{
    await dbConnect();    
    const user  = params.user;
    stringSchema.parse(user);
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const project = await ProjectModel.find({
    
          owner : user,
    
      });
      
     
      return  NextResponse.json(project);
}
catch(error){
  return NextResponse.json(error);
}
}

export { handler as GET }