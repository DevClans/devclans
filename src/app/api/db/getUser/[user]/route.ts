import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req: NextRequest,{ params }:{ params : { user: string }}) {
    
    const user  = params.user;
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const u = await prisma.user.findUnique({
        where: {
          discordId : user,
        },
      });
      
     
      return  NextResponse.json(u);
}

export { handler as GET }