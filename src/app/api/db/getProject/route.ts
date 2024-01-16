import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { ProjectModel } from "@/model/schema";

async function handler(req: Request) {
    await dbConnect();


    const project = await ProjectModel.find();
    return  NextResponse.json(project);
}
export { handler as GET }