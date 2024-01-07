import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type ResponseData = {

  user:string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const { username, email, discordId, password } = await req.body;
    console.log("Creating user using", username, password, email, discordId);
    
    const user = await prisma.user.create({
      data: { username, password, email, discordId },
    });

    // res.status(200).json({ message: 'User created successfully', user });
    res.send({user : JSON.stringify(user)});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ user: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}

export { handler as POST, handler as GET };


