import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req: Request) {
    const user = await prisma.user.findMany();
    return NextResponse.json(user);
}
export { handler as GET}