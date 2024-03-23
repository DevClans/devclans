// app/api/join-team/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from '@/mongodb/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth/auth';
export async function POST(req: NextRequest,res:NextResponse) {
    const session: any = await getServerSession(authOptions);
    console.log(session);
    const userId = session.user._id;
    const { teamCode } = await req.json();
  try {
 

    await dbConnect();

    // Find the project with the provided team code
    const project = await ProjectModel.findOne({ teamCode });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }


    console.log(userId);

    // Add the user's ID to the contributors array
    if(userId){
    project.team.push(userId);
    await project.save();
    return NextResponse.json({ message: 'Joined team successfully' });
    }
    else{
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }


  } catch (error) {
    console.error('Error joining team:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}