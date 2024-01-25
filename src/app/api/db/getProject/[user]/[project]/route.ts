import { NextResponse } from 'next/server';
import  { stringSchema , projectSchema } from "@/zod/zod.common"
import dbConnect from '@/lib/dbConnect';
import { ProjectModel, UserModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { user: string, project: string }}) {
  try{


    await dbConnect();
    
    const  { user, project }  = params;
    stringSchema.parse(user);
    stringSchema.parse(project);
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }
      const u = await UserModel.find({username:user})

   
    const projects = await ProjectModel.findOne({

          owner : u,
          title: project
 
      });
      projectSchema.parse(projects);
     
      return  NextResponse.json(projects);
}
catch(error){
  return NextResponse.json(error);
}
}

export { handler as GET }