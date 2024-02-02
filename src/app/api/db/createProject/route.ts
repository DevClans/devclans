import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel, ProjectModel } from "@/mongodb/models";
import {
  stringSchema,
  zodProjectFormSchema,
  userSchema,
  projectSchema
} from "@/zod/zod.common";

async function handler(req: Request) {
  try {
    await dbConnect();
    console.log("started");
    const body = await req.json();
    const { id, data } = body;
    data.owner = id;
   const dataSet=  projectSchema.parse(data);


  console.log(data)

    const user = await UserModel.findOne({"_id":id});


    if (!user) {
      return NextResponse.json({ message: 'User not found' });  
    }


    // Create a new project
    const createdProject = new ProjectModel(data);
    await createdProject.save();
    // Update the user's projects array
   let str = createdProject._id;


    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $push: { projects: str, ownedProjects:str } },
      
      { new: true } // Return the updated document
    );
    console.log(updatedUser)


console.log("done");

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
