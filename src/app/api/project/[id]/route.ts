import { NextRequest, NextResponse } from "next/server";
import { ProjectModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import { Types } from "mongoose";
import redisClient from "@/redis/config";
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
import { UserProps, userTeamItemKeys } from "@/types/mongo/user.types";
import { getGithubData } from "@/utils/getGithubDataForProject";

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
    let githubAccessToken = "";
    const project: ProjectProps | Record<string, any> = {};
    const setGithubAccessToken = async (obj: ProjectProps) => {
      if (obj.owner && "githubDetails" in obj.owner) {
        githubAccessToken = obj.owner.githubDetails?.accessToken || "";
        // remove from project
        // delete obj.owner.githubDetails?.accessToken;
      }
    };
    const setProjectDataRedis = async (obj: ProjectProps) => {
      // TODO encrypt github access token
      setGithubAccessToken(obj);
      redisClient.hset(
        ProjectRedisKeys.data,
        id,
        JSON.stringify({
          ...obj,
          owner: {
            ...(obj.owner as Partial<UserProps>),
            githubDetails: {
              ...(obj.owner as Partial<UserProps>)?.githubDetails,
              accessToken: githubAccessToken,
            },
          },
        })
      );
      redisClient.expire(ProjectRedisKeys.data, 60 * 60 * 24 * 7); // 1 week
    };
    const projectString = await redisClient.hget(ProjectRedisKeys.list, id);
    // console.info("Project found in cache:", project);
    let isProject: any = {};
    if (projectString) {
      isProject = zodProjectSearchInfoSchema.safeParse(
        JSON.parse(projectString)
      );
      console.info("isProject", !isProject.success && isProject.error);
    }
    if (isProject.success && projectString) {
      console.info("projects cache hit");
      Object.assign(project, JSON.parse(projectString));
      // project is in cache
      // check if project data is in cache
      const projectDataString = await redisClient.hget(
        ProjectRedisKeys.data,
        id
      );
      console.info("projectDataString recieved", Boolean(projectDataString));
      const projectData = projectDataString && JSON.parse(projectDataString);
      const isProjectData: any = zodProjectDataSchema.safeParse(projectData);
      console.info("isProjectData", isProjectData.success);
      if (isProjectData.success) {
        console.info("projects data cache hit");
        // project data is in cache
        setGithubAccessToken(projectData);
        Object.assign(project, projectData);
      } else {
        console.info("projects data cache miss");
        // get project data from db except the search info as it is already in cache
        const projectInfo = await getProjectFromMongo(
          id,
          "-" + projectSearchItemKeys.join(" -")
        );
        // check if project exists in db
        if (!projectInfo) {
          console.error("Project not found");
          throw new Error("Project not found");
        }

        // add to cache
        setProjectDataRedis(projectInfo);

        Object.assign(project, projectInfo);
      }
    } else {
      console.info("projects cache miss");
      const projectInfo: any = await getProjectFromMongo(id);
      // check if project exists in db
      if (!projectInfo) {
        console.error("Project not found");
        throw new Error("Project not found");
      }

      const detailsData: any = {};
      const searchInfoData: any = {};
      for (const key of Object.keys(projectInfo)) {
        if (projectSearchItemKeys.includes(key)) {
          searchInfoData[key] = projectInfo[key];
        } else {
          detailsData[key] = projectInfo[key];
        }
      }
      // add to cache
      console.info("adding project to cache");
      console.info("searchInfoData", searchInfoData);
      console.info("detailsData", detailsData);
      redisClient.hset(
        ProjectRedisKeys.list,
        id,
        JSON.stringify(searchInfoData)
      );
      redisClient.expire(ProjectRedisKeys.list, 60 * 60 * 24 * 7); // 1 week
      setProjectDataRedis(detailsData);
      // projectInfo.owner &&
      //   "githubDetails" in projectInfo.owner &&
      //   delete projectInfo.owner.githubDetails?.accessToken;
      Object.assign(project, projectInfo);
    }
    // * GETTING GITHUB DATA
    await getGithubData(id, project, githubAccessToken);
    console.info("sending project", project);

    return NextResponse.json({
      data: project,
      // files: {
      //   readme: readme,
      //   contributing: contributing,
      // },
      // languages: languagePercentages,
      // Add more fields as needed
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
      .select(select + "-repoDetails")
      .populate("owner", "githubId githubDetails.accessToken")
      .populate("team", userTeamItemKeys.join(" "))
      .lean();
    return project;
  } catch (error) {
    console.error("Error fetching project from MongoDB");
    throw error;
  }
};
