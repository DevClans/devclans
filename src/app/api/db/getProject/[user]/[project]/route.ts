import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req: NextRequest,{ params }:{ params : { user: string, project: string }}) {
    
    const  { user, project }  = params;
  
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const projects = await prisma.project.findUnique({
        where: {
          ownerId : user,
          id: project
        },
      });
      
     
      return  NextResponse.json(projects);
}

export { handler as GET }