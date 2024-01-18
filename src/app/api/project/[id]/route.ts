import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { ProjectModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import { Types } from "mongoose";
import redisClient from "@/redis/config";
import { z } from "zod";
import { zodMongoId } from "@/zod/zod.common";
import { ProjectProps } from "@/types/mongo/project.types";

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
    let project: ProjectProps | null = null;
    console.info("getting project details from cache");
    const projectString = await redisClient.hget("project", id);
    if (projectString) {
      project = JSON.parse(projectString);
    }
    // console.info("Project found in cache:", project);
    if (!project) {
      const { team, ...data } = await ProjectModel.findById({
        _id: new Types.ObjectId(id),
      }).populate([
        {
          path: "team",
          select:
            "_id username avatar githubAccessToken discordId contactMethod contactMethodId",
        },
        {
          path: "owner",
          select:
            "_id username avatar githubAccessToken discordId contactMethod contactMethodId",
        },
      ]);
      project = data as ProjectProps;
      // try getting user data from cache
      // get needed data using team fields
      // get user discord username using discordId
      // for team
      // for owner
      // get user github username using github access token
      // for team
      // for owner
      // storing github data in mongodb to run queries on it
      // store users data in cache
      if (project) {
        // store in cache
        redisClient.hset("project", id, JSON.stringify(project));
      }
    }
    // check if project exists
    if (!project) {
      console.error("Project not found");
      return NextResponse.json({ message: "Project not found" });
    }
    // console.info("Project found in MDB:", project);
    let readme: string | null = "";
    let contributing: string | null = "";
    // Check if readme is in cache
    console.info("getting readme from cache");
    readme = await redisClient.hget("project", id + "readme");
    console.info("readme from cache:", readme);
    if (!readme) {
      console.info("fetching readme from github");
      // Fetch README contents from GitHub using fetch
      const readmeUrl = `https://api.github.com/repos/sidxh/devclans/readme`;

      try {
        const readmeResponse = await fetch(readmeUrl);

        if (!readmeResponse.ok) {
          throw new Error(
            `GitHub request failed with status ${readmeResponse.status}`
          );
        }

        const readmeData = await readmeResponse.json();
        const readmeContent = Buffer.from(
          readmeData.content,
          "base64"
        ).toString();

        if (readmeContent) {
          readme = readmeContent;
          // Store in cache
          await redisClient.hset("project", id + "readme", readmeContent);
          return; // Exit the function after setting readme
        }
      } catch (error: any) {
        console.error("Error fetching README from GitHub:", error.message);
        // Handle the error as needed
      }
    }
    // Check if CONTRIBUTING is in cache
    console.info("getting contri from cache");
    contributing = await redisClient.hget("project", id + "contributing");
    if (!contributing) {
      try {
        console.info("fetching contri from github");
        // Fetch CONTRIBUTING content
        const contributingUrl = `https://api.github.com/repos/sidxh/devclans/contents/CONTRIBUTING.md`;
        const contributingResponse = await axios.get(contributingUrl);
        const contributingContent = Buffer.from(
          contributingResponse.data.content,
          "base64"
        ).toString();
        if (contributingContent) {
          contributing = contributingContent;
          // store in cache
          redisClient.hset("project", id + "contributing", contributingContent);
        }
      } catch (error: any) {
        console.error("Error fetching contri from GitHub:", error.message);
      }
    }

    // Check if languages are in cache
    console.info("getting languages from cache");
    const percentCache = await redisClient.hget("project", id + "languages");

    // Parse JSON if language percentages are retrieved from the cache
    let languagePercentages: { [key: string]: number } | null = null;
    if (percentCache) {
      languagePercentages = JSON.parse(percentCache);
    }

    if (!languagePercentages) {
      try {
        console.info("fetching languages from github");

        // Fetch languages used
        const languagesUrl = `https://api.github.com/repos/sidxh/devclans/languages`;
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

        // Store in cache
        await redisClient.hset(
          "project",
          id + "languages",
          JSON.stringify(languagePercentages)
        );
      } catch (error: any) {
        console.error("Error fetching languages from GitHub:", error.message);
      }
    }

    // Now, languagePercentages contains the language percentages or is retrieved from the cache.
    console.log("Language Percentages:", languagePercentages);

    return NextResponse.json({
      data: project,
      files: {
        readme: readme,
        contributing: contributing,
      },
      languages: languagePercentages,
      // Add more fields as needed
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
