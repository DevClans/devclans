import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel, ProjectModel } from "@/model/schema";

async function handler(req: Request) {
  await dbConnect();

  const { userId, projectName, projectDescription, problem } = await req.json();

  try {
    console.log("started");
    // Find the user
    const user = await UserModel.findOne({ username: userId });

    if (!user) {
      return NextResponse.json({ message: 'User not found' });
    }

    // Create a new project
    const createdProject = new ProjectModel({
      title: projectName,
      desc: projectDescription,
      owner: user._id,
      contributors: [user._id], // Assuming the owner is also a member initially
      projectDetails:{
        problem:problem
      }
    });
    await createdProject.save();
    // Update the user's projects array
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $push: { projects: createdProject._id, ownedProjects:createdProject._id } },
      { new: true } // Return the updated document
    );
console.log("done");
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

export { handler as POST };
