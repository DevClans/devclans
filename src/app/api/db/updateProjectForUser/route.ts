import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: Request) {
  if (req.method !== 'PUT') {
    return NextResponse.json({ message: 'Method Not Allowed' });
  }

  const { userId, projectId, projectName, projectDescription } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: projectName,
        description: projectDescription,
      },
    });

    return NextResponse.json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    console.error('Error updating project for user:', error);
    return NextResponse.json({ message: 'Internal Server Error' });
  }
}
