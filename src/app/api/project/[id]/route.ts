import { NextRequest, NextResponse } from "next/server";
import { ProjectModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import { Types } from "mongoose";
import { z } from "zod";
import {
  zodMongoId,
  zodProjectDataSchema,
  zodProjectSearchInfoSchema,
} from "@/zod/zod.common";
import {
  ProjectProps,
  ProjectRedisKeys,
  projectSearchItemKeys,
} from "@/types/mongo/project.types";
import { userTeamItemKeys } from "@/types/mongo/user.types";
import { getGithubData } from "@/utils/getGithubDataForProject";
import updateAllCache from "@/redis/updateUserCache";
import { redisGet, redisSet } from "@/redis/basicRedis";

const zodCheck = z.object({
  id: zodMongoId,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    const zodParams = zodCheck.parse(params);
    const { id } = zodParams;
    if (!id) {
      console.error("id not found");
      return NextResponse.json({ message: "id not found" });
    }
    await dbConnect();
    console.info("Fetching project details for id:", id);
    // check if project is in cache
    // * GETTING PROJECT DATA
    const project: ProjectProps | Record<string, any> = {};
    console.info("Fetching project search info for id:", id);
    const projectString = await redisGet(ProjectRedisKeys.list, id);
    // console.info("Project found in cache:", project);
    let isProject: any = {};
    let getProjectSearchInfo = false;
    let getProjectData = false;
    if (projectString) {
      isProject = zodProjectSearchInfoSchema.safeParse(projectString);
      console.info("isProject", isProject.success || isProject.error);
    }
    if (isProject.success && projectString) {
      console.info("projects search info cache hit");
      Object.assign(project, isProject.data);
    } else {
      console.info(
        "projects search info cache miss",
        isProject.error || Boolean(projectString)
      );
      getProjectSearchInfo = true;
    }

    // project is in cache
    // check if project data is in cache
    console.info("Fetching project data for id:", id);
    const projectData = await redisGet(ProjectRedisKeys.data, id);
    console.info("projectData recieved", Boolean(projectData));
    const isProjectData: any = zodProjectDataSchema.safeParse(projectData);
    console.info("isProjectData", isProjectData.success);

    if (isProjectData.success) {
      console.info("projects data cache hit");
      // project data is in cache
      Object.assign(project, projectData);
    } else {
      console.info("projects data cache miss", isProjectData.error);
      getProjectData = true;
    }

    if (getProjectData || getProjectSearchInfo) {
      // * GETTING DATA FROM DB
      console.info("Fetching project data from db for id:", id);
      let select = "";
      // get both
      if (!(getProjectData && getProjectSearchInfo)) {
        if (getProjectSearchInfo) {
          // get only search info data
          select += projectSearchItemKeys.join(" ");
        } else {
          select += "-" + projectSearchItemKeys.join(" -");
        }
      }

      const projectInfo: ProjectProps | null = await getProjectFromMongo(
        id,
        select
      );
      // check if project exists in db
      if (!projectInfo) {
        console.error("Project not found");
        throw new Error("Project not found");
      }
      // * SETTING CACHE
      console.log("setting prject cache");
      if (!select) {
        // we got all data
        updateAllCache(projectInfo._id.toString(), projectInfo, "projects");
      } else {
        if (getProjectSearchInfo) {
          console.log("setting search info cache");
          // we got only search info
          redisSet(ProjectRedisKeys.list, id, projectInfo);
        } else {
          console.log("setting data cache");
          // we got only project data
          redisSet(
            ProjectRedisKeys.data,
            id,
            zodProjectDataSchema.partial().parse(projectInfo)
          );
        }
      }
      // * SETTING RESPONSE OBJECT
      Object.assign(project, projectInfo);
    }

    // * GETTING GITHUB DATA
    await getGithubData(id, project);
    console.info("sending project", project);

    return NextResponse.json({
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json({ message: "Internal Server Error", error });
  }
}

// * mdb functions
const getProjectFromMongo = async (id: string, select = "") => {
  try {
    const project: ProjectProps | null = await ProjectModel.findById(
      new Types.ObjectId(id)
    )
      .select(select + (select.includes("-") ? " -repoDetails" : ""))
      .populate([
        {
          path: "owner",
          select: "githubDetails.login",
        },
        {
          path: "team",
          select: userTeamItemKeys.join(" "),
        },
      ])
      .lean();
    return project;
  } catch (error) {
    console.error("Error fetching project from MongoDB");
    throw error;
  }
};
