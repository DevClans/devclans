import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongoose.config";
import { ProjectModel, UserModel } from "@/models/models";

async function handler(req: Request) {
  await dbConnect();
  const { userId, projectName, projectDescription } = await req.json();

  try {
    const user = await UserModel.findById({
      id: userId,
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const createdProject = await ProjectModel.create({
      name: projectName,
      description: projectDescription,
      ownerId: userId,
      members: [userId], // Assuming the owner is also a member initially
    });
    const updatedUser = await UserModel.updateOne(
      { _id: userId },
      { $push: { projects: createdProject._id } }
    );

    return NextResponse.json({
      message: "Project created and associated with user successfully",
      user: updatedUser,
      project: createdProject,
    });
  } catch (error) {
    console.error("Error creating project for user:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}

export { handler as POST };
