import { NextResponse } from "next/server";
import dbConnect from "@/utils/mongoose.config";
import { ProjectModel } from "@/mongodb/models";

async function handler(req: Request) {
  await dbConnect();
  const project = await ProjectModel.find({});
  return NextResponse.json(project);
}
export { handler as GET };
