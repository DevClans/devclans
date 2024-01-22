import { NextResponse } from 'next/server';
import { z } from "zod";

import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/model/schema";


async function handler(req: Request) {
  console.log("before connection");
  await dbConnect();
  console.log("connected");

    const { name, email, discordId, username,githubId } =  await req.json()
      try {
        var stringSchema= z.string();
        stringSchema.parse(username);
        stringSchema.parse(name);
        stringSchema.parse(githubId);
        stringSchema.parse(email);
        stringSchema.parse(discordId);
    console.log("Creating user using", name, email, discordId,username,githubId);
    
    const user = new UserModel({
    name, email, discordId ,username,githubId
    });
    await user.save();
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating user:', error);
   return NextResponse.json({message: error})
  } 
}

export { handler as POST};



