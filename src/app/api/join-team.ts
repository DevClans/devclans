// app/api/join-team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from '@/mongodb/models';

export async function POST(req: NextRequest) {
  try {
    const { teamCode } = await req.json();

    await dbConnect();

    // Find the project with the provided team code
    const project = await ProjectModel.findOne({ teamCode });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get the current user's ID from the session or request
    const userId = req.cookies.get('session')?.value; // Replace with your logic to get the user ID

    // Add the user's ID to the contributors array
    project.contributors.push(userId);

    // Save the updated project document
    await project.save();

    return NextResponse.json({ message: 'Joined team successfully' });
  } catch (error) {
    console.error('Error joining team:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}