import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { user: string, project: string }}) {
    await dbConnect();
    
    const  { user, project }  = params;
  
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const projects = await ProjectModel.find({

          owner : user,
          _id: project
 
      });
      
     
      return  NextResponse.json(projects);
}

export { handler as GET }