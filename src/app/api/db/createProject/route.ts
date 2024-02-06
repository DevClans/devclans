import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel, ProjectModel } from "@/mongodb/models";
import {
  stringSchema,
  zodProjectFormSchema,
  userSchema,
  projectSchema,
  zodMongoId,
} from "@/zod/zod.common";

async function handler(req: Request) {
  try {
    await dbConnect();
    console.log("started creating project for user");
    const body = await req.json();
    const { id, data } = body;
    const userid = zodMongoId.parse(id);
    const dataSet = zodProjectFormSchema.parse(data);
    // fetch and ADD GITHUB DATA
    console.log("data recieved ", dataSet, "from id ", userid);

    // const user = await UserModel.findOne({"_id":id});

    // if (!user) {
    //   return NextResponse.json({ message: 'User not found' });
    // }

    // Create a new project
    const createdProject = new ProjectModel({ ...dataSet, owner: userid });
    await createdProject.save();
    // Update the user's projects array
    const projectId = createdProject._id;
    console.log("new project id", projectId);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userid },
      { $push: { ownedProjects: projectId } },

      { new: true } // Return the updated document
    );
    console.log("updated user ", updatedUser);

    console.log("done");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // console.error("Error updating user profile:", error);
    console.error("Error message:", error?.message);
    console.error("Zod parse error message:", error?.issues?.[0]?.message);
    return NextResponse.json(null, {
      status: 500,
      statusText:
        error?.issues?.[0]?.message ||
        error?.message ||
        "Error updating user profile",
    });
  }
}

export { handler as POST };
