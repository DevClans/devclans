import { ProjectModel } from "@/mongodb/models";
import updateAllCache from "@/redis/updateUserCache";
import { zodMongoId, zodProjectFormSchemaServer } from "@/zod/zod.common";
import { NextResponse } from "next/server";
import { z } from "zod";

const handler = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    console.log("started updating project for user");
    // get the id from the request
    const body = await req.json();
    const check = z.object({
      id: zodMongoId,
      data: zodProjectFormSchemaServer,
    });
    const { id: userid, data } = check.parse(body);
    const projectId = zodMongoId.parse(params?.id);
    console.log("started updating project for user", userid, projectId, data);
    // find the project with the id
    const project = await ProjectModel.findOneAndUpdate(
      { _id: projectId, owner: userid },
      { $set: data },
      { new: true }
    );
    // if not found return 404
    if (!project) {
      console.error("Project not found");
      throw new Error("Project not found");
    }
    // update project in cache
    console.log("Update project data cache...");
    await updateAllCache(projectId, project, "projects");
    console.log("Project data cache updated");
    // return success message
    return NextResponse.json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("error in update project route", error);
    return NextResponse.error();
  }
};

export { handler as POST };
