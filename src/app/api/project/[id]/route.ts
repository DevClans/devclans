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
      project = await ProjectModel.findById({
        _id: new Types.ObjectId(id),
      });
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
    if (!readme) {
      console.info("fetching readme from github");
      // Fetch README contentsrc/app/api/project/[id]/route.ts
      const readmeUrl = `https://api.github.com/repos/sidxh/devclans/readme`;
      const readmeResponse = await axios.get(readmeUrl);
      const readmeContent = Buffer.from(
        readmeResponse.data.content,
        "base64"
      ).toString();
      if (readmeContent) {
        readme = readmeContent;
        // store in cache
        redisClient.hset("project", id + "readme", readmeContent);
      }
    }
    // Check if CONTRIBUTING is in cache
    console.info("getting contri from cache");
    contributing = await redisClient.hget("project", id + "contributing");
    if (!contributing) {
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
    }
    // Fetch languages used
    const languagesUrl = `https://api.github.com/repos/sidxh/devclans/languages`;
    const languagesResponse = await axios.get(languagesUrl);
    const languages = languagesResponse.data;

    // Calculate the total number of bytes
    const totalBytes: any = Object.values(languages).reduce(
      (acc: any, bytes) => acc + bytes,
      0
    );

    // Calculate the percentage for each language
    const languagePercentages = Object.fromEntries(
      Object.entries(languages).map(([language, bytes]: any) => [
        language,
        (bytes / totalBytes) * 100,
      ])
    );

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
