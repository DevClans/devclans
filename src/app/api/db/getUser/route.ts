import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/model/schema";
import { userArraySchema } from '@/zod/zod.common';

async function handler(req: Request) {
    await dbConnect();

    const user = await UserModel.find();
    // userArraySchema.parse(user);
    
    
    return  NextResponse.json(user);
}
export { handler as GET}