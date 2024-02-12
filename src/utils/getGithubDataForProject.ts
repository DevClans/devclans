import { getOctokit } from "@/github/config.github";
import { getGithubReadmeNew } from "@/github/repos/gh.getReadmeNew";
import { ProjectModel } from "@/mongodb/models";
import { redisGet, redisSet } from "@/redis/basicRedis";
import redisClient from "@/redis/config";
import {
  ProjectRedisKeys,
  ProjectRepoDetailsKeys,
} from "@/types/mongo/project.types";
import {
  stringSchema,
  zodGithubDataSchema,
  zodRepoDetailsSchema,
} from "@/zod/zod.common";
import axios from "axios";
import { Types } from "mongoose";

export const getGithubData = async (
  projectId: string,
  project: any,
  accessToken: string
) => {
  try {
    console.info("-- getting github data --");
    const projectData = zodGithubDataSchema.partial().parse(project);
    const userAccessToken =
      accessToken ||
      (typeof projectData.owner != "string" &&
        projectData.owner?.githubDetails?.accessToken);
    let readme: string | null = "";
    let contributing: string | null = "";
    let languagePercentages: { [key: string]: number } | null = null;
    let githubapi = null;
    let default_branch = "";

    const repoDetails: any = {};

    // Check if readme is in cache
    const githubDataString = await redisGet(ProjectRedisKeys.github, projectId);
    const a = zodRepoDetailsSchema.safeParse(githubDataString);
    const { success } = a;
    const githubData = success ? a.data : {};
    // add all found data to final object
    Object.assign(repoDetails, githubData);
    console.log("githubData.success", success);
    const errorPaths = new Set(
      !success ? a.error?.errors.flatMap((e: any) => e.path) : []
    );
    console.log("errorPaths", errorPaths);

    // check if all repoDetails fields are in cache. get missing fields
    if (success) {
      console.info("github data cache hit");
      Object.assign(project, { repoDetails: githubData });
    } else {
      console.info("fetching github data");
      // Fetch GitHub data
      const reponameArr = projectData.repoName?.startsWith("/")
        ? projectData.repoName.substring(1).split("/")
        : projectData.repoName?.split("/");
      if (!reponameArr || reponameArr?.length < 2) {
        throw new Error("Invalid reponame");
      }
      const reponame = reponameArr[1];
      const usernameFromRepo = reponameArr[0];
      const username =
        usernameFromRepo ||
        (typeof projectData.owner != "string" &&
          (projectData.owner?.githubId ||
            projectData.owner?.githubDetails?.login));
      const githubUrl =
        stringSchema.safeParse(reponame).success &&
        `https://api.github.com/repos/${usernameFromRepo}/${reponame}`;
      if (!githubUrl) {
        console.error("Error fetching github data: githubUrl not found");
        return { readme, contributing, languagePercentages };
      }
      console.info("githubUrl =>", githubUrl);
      console.info("userAccessToken", Boolean(userAccessToken));
      if (userAccessToken) {
        console.info("have access to user accesstoken");
        // TO GET: REPO INFO
        githubapi = await getOctokit({ accessToken: userAccessToken });

        console.info("github api =>", githubapi?.type);
        // get github related data
        let data: any;
        if (githubapi?.type == "auth" && username) {
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
          if (githubapi?.type == "auth" && username) {
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
        readme = await getGithubReadmeNew({
          githubApi: githubapi,
          username: username as string,
          repoName: reponame,
          githubUrl,
        });
      } else {
        console.info("readme cache hit");
      }

      if (errorPaths.size > 0 ? errorPaths.has("contributing") : true) {
        contributing = await getGithubReadmeNew({
          githubApi: githubapi,
          username: username as string,
          repoName: reponame,
          githubUrl,
          type: "contributing",
        });
      } else {
        console.info("contributing cache hit");
      }

      // LANGUAGE PERCENTAGES
      if (errorPaths.size > 0 ? errorPaths.has("languages") : true) {
        console.info("fetching languages from github");
        try {
          // Fetch languages used
          const languages = await getGithubReadmeNew({
            githubApi: githubapi,
            username: username as string,
            repoName: reponame,
            githubUrl,
            type: "languages",
          });
          if (!languages) {
            throw new Error("Error fetching languages from GitHub");
          }
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
          console.error("Error fetching languages from GitHub:", error.message);
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
        new Types.ObjectId(projectId),
        {
          $set: { repoDetails },
        }
      );
      // setting project info
      project.repoDetails = repoDetails;

      console.info("repodetails updated in db", Boolean(updateRes));
      // store in cache
      await redisSet(ProjectRedisKeys.github, projectId, repoDetails);
    }
    console.info("repoDetails", Boolean(repoDetails));
    return {
      readme: repoDetails["readme"],
      contributing: repoDetails["contributing"],
      languagePercentages: repoDetails["languages"],
    };
  } catch (error) {
    console.error("Error fetching github data:", error);
  }
};
