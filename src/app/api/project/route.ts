import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongoose.config";
import { ProjectModel } from "@/mongodb/models";

async function handler(req: Request) {
  try {
    await dbConnect();
    // check in cache
    // if not found in cache, get from database
    // store in cache
    const projects = await ProjectModel.find({}).populate([
      {
        path: "team",
        select: "_id discordId",
      },
    ]);
    console.log("sending projects scuuessfully");
    // console.log(projects);
    return NextResponse.json(projects);
  } catch (error) {
    console.log(error, "in project route");
    return NextResponse.error();
  }
}
export { handler as GET };
