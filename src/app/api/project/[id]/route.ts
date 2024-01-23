import { NextRequest, NextResponse } from "next/server";
import { ProjectModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import redisClient from "@/redis/config";
import { z } from "zod";
import { zodMongoId } from "@/zod/zod.common";
import { ProjectProps } from "@/types/mongo/project.types";
import axios from "axios";

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
    
    // Fetch project with necessary populated fields
    const project = await ProjectModel.findById(id)
      .populate('owner', 'username avatar') // Populate owner with specific fields
      .populate('contributors', 'username avatar') // Populate contributors with specific fields
      .populate('team', 'username avatar'); // Populate team with specific fields

    if (!project) {
      console.error("Project not found for id:", id);
      return NextResponse.json({ message: "Project not found" });
    }

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
    });

  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}