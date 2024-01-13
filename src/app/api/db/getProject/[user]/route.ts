import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
const prisma = new PrismaClient();

async function handler(req:Request,{ params }:{ params : { user: string }}) {
    
    const user  = params.user;
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const project = await prisma.project.findMany({
        where: {
          ownerId : user,
        },
      });
      
     
      return  NextResponse.json(project);
}

export { handler as GET }