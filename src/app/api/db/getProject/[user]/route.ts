import { NextResponse } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { user: string }}) {
    await dbConnect();    
    const user  = params.user;
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const project = await ProjectModel.find({
    
          owner : user,
    
      });
      
     
      return  NextResponse.json(project);
}

export { handler as GET }