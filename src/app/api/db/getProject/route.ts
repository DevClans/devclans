import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from "@/model/schema";
import { projectArraySchema } from '@/zod/zod.common';

async function handler(req: Request) {
    await dbConnect();


    const project = await ProjectModel.find();
    projectArraySchema.parse(project);

    return  NextResponse.json(project);
}
export { handler as GET }