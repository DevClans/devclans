import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req: Request) {

    const { username, email, discordId, password } =  await req.json()
      try {
  
    console.log("Creating user using", username, password, email, discordId);
    
    const user = await prisma.user.create({
      data: { username, password, email, discordId },
    });
    
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating user:', error);
   return NextResponse.json({message: error})
  } finally {
    await prisma.$disconnect();
  }
}

export { handler as POST};



