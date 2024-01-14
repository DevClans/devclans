import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


async function handler(req:Request) {
    const { userId, projectName, projectDescription } = await req.json();
    const x=0;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return NextResponse.json({ message: 'User not found' });
      }
  
      const createdProject = await prisma.project.create({
        data: {
          name: projectName,
          description: projectDescription,
          ownerId: userId,
          members: [userId], // Assuming the owner is also a member initially
        },
      });
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { projects: { connect: { id: createdProject.id } } },
      });
  
      return NextResponse.json({
        message: 'Project created and associated with user successfully',
        user: updatedUser,
        project: createdProject,
      });
    } catch (error) {
      console.error('Error creating project for user:', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  }


export { handler as POST }