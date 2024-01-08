import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req: Request) {
    const project = await prisma.project.findMany();
    return  NextResponse.json(project);
}
export { handler as GET}