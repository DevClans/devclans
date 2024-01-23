import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/model/schema";

async function handler(req: Request) {
    await dbConnect();

    const user = await UserModel.find();
    return  NextResponse.json(user);
}
export { handler as GET}