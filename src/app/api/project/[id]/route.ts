import { zodRepoDetailsSchema } from "./../../../../zod/zod.common";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
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
  ProjectRepoDetailsKeys,
  projectSearchItemKeys,
} from "@/types/mongo/project.types";
import { UserProps, userTeamItemKeys } from "@/types/mongo/user.types";
import { getOctokit } from "@/github/config.github";

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

// * github data functions
const getGithubData = async (
  id: string,
  project: any,
  userAccessToken: string
) => {
  try {
    let readme: string | null = "";
    let contributing: string | null = "";
    let languagePercentages: { [key: string]: number } | null = null;
    const repoDetails: any = {};

    // Check if readme is in cache
    console.info("-- getting github data --");
    const githubDataString = await redisClient.hget(
      ProjectRedisKeys.github,
      id
    );
    const {
      data: githubData,
      success,
      error,
    }: {
      data?: any;
      success: boolean;
      error?: any;
    } = zodRepoDetailsSchema.safeParse(
      githubDataString && JSON.parse(githubDataString)
    );
    // add all found data to final object
    Object.assign(
      repoDetails,
      (githubDataString && JSON.parse(githubDataString)) || {}
    );
    console.log("githubData.success", success);
    const errorPaths = new Set(error?.errors.flatMap((e: any) => e.path));
    console.log("errorPaths", errorPaths);
    const repoInfoFields = [
      "description",
      "stars",
      "forks",
      "watchers",
      "topics",
    ];
    // check if all repoDetails fields are in cache. get missing fields
    if (success) {
      console.info("github data cache hit", githubData);
      Object.assign(project, { repoDetails: JSON.parse(githubData) });
    } else {
      console.info("fetching github data");
      // Fetch GitHub data
      const username = project.owner.githubId;
      const reponame = project.repoName;
      const githubUrl =
        username &&
        reponame &&
        `https://api.github.com/repos/${username}/${reponame}`;
      if (!githubUrl) {
        console.error("Error fetching github data: githubUrl not found");
        return { readme, contributing, languagePercentages };
      }
      console.info("userAccessToken", userAccessToken);
      if (userAccessToken) {
        console.info("have access to user accesstoken");
        let default_branch = "";
        // TO GET: REPO INFO
        const githubapi = await getOctokit({ accessToken: userAccessToken });

        console.info("github api =>", githubapi?.type);
        // get github related data
        let data: any;
        if (githubapi?.type == "auth") {
          data = await githubapi.api.request(`GET /repos/{owner}/{repo}`, {
            owner: username,
            repo: reponame,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          });
        } else {
          console.info("using axios for github info");
          const repoUrl = `${githubUrl}`;
          data = await axios.get(repoUrl).catch((err) => {
            console.error("error getting github data", repoUrl, err.message);
            return { message: err.message };
          });
        }
        if (!data.message) {
          console.info("got github info from github");
          const skipKeys = ["commits", "lastCommit", "languages"]; // cant get these from github api
          for (const key of ProjectRepoDetailsKeys) {
            if (skipKeys.includes(key)) continue;
            if (key == "owner") {
              repoDetails["owner"] = data.data[key]?.login;
              continue;
            }
            repoDetails[key] = data.data[key];
          }
          default_branch = data.data["default_branch"];
        }
        // TO GET : LAST COMMIT
        // get last commit only if not in cache
        if (
          default_branch &&
          (errorPaths.size > 0 ? errorPaths.has("lastCommit") : true)
        ) {
          let commitsData: any;
          // if we have auth accesstoken then get using last commit else use axios
          if (githubapi?.type == "auth") {
            console.info("using github api for last commit");
            commitsData = await githubapi.api.request(
              `GET /repos/{owner}/{repo}/commits/{ref}`,
              {
                owner: username,
                repo: reponame,
                ref: default_branch,
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                },
              }
            );
          } else {
            console.info("using axios for last commit");
            const commitUrl = `${githubUrl}/commits/${default_branch}`;
            commitsData = await axios.get(commitUrl).catch((err) => {
              console.error("error getting commits", commitUrl, err.message);
              return { message: err.message };
            });
          }
          if (!commitsData.message && commitsData.status == 200) {
            console.info("got last commit");
            const lastCommit = commitsData.data?.commit?.committer.date;
            repoDetails["lastCommit"] = lastCommit;
            console.info("last commit", lastCommit);
          }
        } else {
          if (default_branch) {
            console.info("last commit cache hit", repoDetails["lastCommit"]);
          } else {
            console.info("default_branch not found");
          }
        }
        console.info("repoDetails finalised", repoDetails);
      }

      if (errorPaths.size > 0 ? errorPaths.has("readme") : true) {
        console.info("fetching readme from github");
        // README
        const readmeUrl = `${githubUrl}/readme`;

        try {
          const readmeResponse = await fetch(readmeUrl);
          if (!readmeResponse.ok)
            throw new Error(
              `GitHub request failed with status ${readmeResponse.status}`
            );
          const readmeData = await readmeResponse.json();
          const readmeContent = Buffer.from(
            readmeData.content,
            "base64"
          ).toString();
          if (readmeContent) {
            readme = readmeContent;
          }
        } catch (error: any) {
          console.error(
            "Error fetching README from GitHub:",
            readmeUrl,
            error.message
          );
        }
      } else {
        console.info("readme cache hit");
      }

      if (errorPaths.size > 0 ? errorPaths.has("contributing") : true) {
        console.info("fetching contributing from github");
        // CONTRIBUTING
        const contributingUrl = `${githubUrl}/CONTRIBUTING.md`;
        try {
          // Fetch CONTRIBUTING content
          const contributingResponse = await axios.get(contributingUrl);
          const contributingContent = Buffer.from(
            contributingResponse.data.content,
            "base64"
          ).toString();
          if (contributingContent) {
            contributing = contributingContent;
          }
        } catch (error: any) {
          console.error(
            "Error fetching contri from GitHub:",
            contributingUrl,
            error.message
          );
        }
      } else {
        console.info("contributing cache hit");
      }

      // LANGUAGE PERCENTAGES
      if (errorPaths.size > 0 ? errorPaths.has("languages") : true) {
        console.info("fetching languages from github");
        const languagesUrl = `${githubUrl}/languages`;
        try {
          // Fetch languages used
          const languagesResponse = await axios.get(languagesUrl);
          const languages = languagesResponse.data;

          // Calculate the total number of bytes
          const totalBytes: number = Number(
            Object.values(languages).reduce(
              (acc, bytes) => Number(acc) + Number(bytes),
              0
            )
          );

          // Calculate the percentage for each language
          languagePercentages = Object.fromEntries(
            Object.entries(languages).map(([language, bytes]) => [
              language,
              (Number(bytes) / totalBytes) * 100,
            ])
          );
        } catch (error: any) {
          console.error(
            "Error fetching languages from GitHub:",
            languagesUrl,
            error.message
          );
        }
      } else {
        console.info("languages cache hit");
      }

      // Now, languagePercentages contains the language percentages or is retrieved from the cache.
      // UPDATING CACHE AND DB
      if (readme) {
        repoDetails["readme"] = readme;
      }
      if (contributing) {
        repoDetails["contributing"] = contributing;
      }
      if (languagePercentages) {
        repoDetails["languages"] = languagePercentages;
      }
      // store newly acquired data into db for queries
      const updateRes = await ProjectModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        {
          $set: { repoDetails },
        }
      );
      // setting project info
      project.repoDetails = repoDetails;

      console.info("updateRes for repodetails", Boolean(updateRes));
      // store in cache
      redisClient.hset(
        ProjectRedisKeys.github,
        id,
        JSON.stringify(repoDetails)
      );
      redisClient.expire(ProjectRedisKeys.github, 60 * 60 * 24 * 7); // 1 week
    }
    console.info("repoDetails", repoDetails);
    return {
      readme: repoDetails["readme"],
      contributing: repoDetails["contributing"],
      languagePercentages: repoDetails["languages"],
    };
  } catch (error) {
    console.error("Error fetching github data:", error);
  }
};
