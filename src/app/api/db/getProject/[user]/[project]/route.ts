import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
const prisma = new PrismaClient();

async function handler(req:Request,{ params }:{ params : { user: string, project: string }}) {
  const x=0;
    
    const  { user, project }  = params;
  
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const projects = await prisma.project.findMany({
        where: {
          ownerId : user,
          id: project
        },
      });
      
     
      return  NextResponse.json(projects);
}

export { handler as GET }