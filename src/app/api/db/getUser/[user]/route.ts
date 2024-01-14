import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';
const prisma = new PrismaClient();

async function handler(req:Request,{ params }:{ params : { user: string }}) {
  const x=0;
    
    const user  = params.user;
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const u = await prisma.user.findUnique({
        where: {
          id : user,
        },
      });
      
     
      return  NextResponse.json(u);
}

export { handler as GET }