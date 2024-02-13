import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel, ProjectModel } from "@/mongodb/models";
import { zodMongoId, zodProjectFormSchemaServer } from "@/zod/zod.common";
import updateAllCache from "@/redis/updateUserCache";
import { getGithubData } from "@/utils/getGithubDataForProject";
import { UserRedisKeys } from "@/types/mongo/user.types";
import { redisGet, redisSet } from "@/redis/basicRedis";

async function handler(req: Request) {
  try {
    await dbConnect();
    console.log("started creating project for user");
    const body = await req.json();
    const { id, data } = body;
    const userid = zodMongoId.parse(id);
    const dataSet = zodProjectFormSchemaServer.parse(data);
    // fetch and ADD GITHUB DATA
    console.log("data recieved ", dataSet, "from id ", userid);

    // Create a new project
    const createdProject = await ProjectModel.create({
      ...dataSet,
      owner: userid,
      team: [userid],
    });
    const projectData = createdProject.toObject();
    const projectId = zodMongoId.parse(createdProject._id);
    console.log("new project id", projectId);
    // * project cache stopped for now
    // add project info in cache
    // ? before updating project data cache we need to populate team and owner id. but instead of doing that we can just let cache be updated when we fetch the data.
    // console.log("Update project data cache...");
    // await updateAllCache(projectId, createdProject, "projects");
    // console.log("Project data cache updated");
    // update user data

    console.log("Updating user data cache...");
    const updatedUser: any = await UserModel.findOneAndUpdate(
      { _id: userid },
      { $push: { ownedProjects: projectId } },
      { new: true } // Return the updated document
    )
      .select(
        "githubId githubDetails.accessToken githubDetails.username githubDetails.login"
      )
      .lean();
    console.log("Updated user profile:", updatedUser);
    // update user cache
    console.log("getting user data cache...");
    try {
      const userdata = await redisGet(UserRedisKeys.data, userid);
      if (!userdata) throw new Error("no user data found in cache");
      console.log("updating user data in cache in createProject");
      if (userdata.ownedProjects) {
        if (userdata.ownedProjects.includes(projectId)) {
          console.log("project already exists in user data");
          throw new Error("project already exists in user data");
        }
        userdata.ownedProjects.push(projectId);
      } else {
        userdata.ownedProjects = [projectId];
      }
      await redisSet(UserRedisKeys.data, userid, userdata);
      console.log("user data in cache updated in createProject");
    } catch (error) {
      console.error("Error updating user data cache in createProject:", error);
    }

    //  we are getting entire data and updating entire cache. but this is not optimal. just getting updated info will be nicer.

    // fetching and add github data
    getGithubData(
      projectId,
      { ...projectData, owner: updatedUser },
      updatedUser?.githubDetails?.accessToken || ""
    ).then((data) => {
      if (data) {
        console.log("Github data fetched");
      } else {
        console.log("Github data fetched failed");
      }
    });

    console.log("Project successfully created");

    return NextResponse.json({ success: true, id: projectId });
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
