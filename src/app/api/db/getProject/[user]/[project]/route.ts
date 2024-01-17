import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { ProjectModel, UserModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { user: string, project: string }}) {
    await dbConnect();
    
    const  { user, project }  = params;
  
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }
      const u = await UserModel.find({username:user})

   
    const projects = await ProjectModel.find({

          owner : u,
          title: project
 
      });
      
     
      return  NextResponse.json(projects);
}

export { handler as GET }