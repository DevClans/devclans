import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { user: string }}) {
    await dbConnect();
    
    const user  = params.user;
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }

   
    const u = await UserModel.find({
      username : user
    });
      
     
      return  NextResponse.json(u);
}

export { handler as GET }