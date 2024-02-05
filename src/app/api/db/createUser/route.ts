import { NextResponse } from 'next/server';
import  { stringSchema } from "@/zod/zod.common"
import { userSchema } from '@/zod/zod.common';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/mongodb/models";


async function handler(req: Request) {
  console.log("before connection");
  await dbConnect();
  console.log("connected");

    const {email,phone, discordId, username,githubDetails } =  await req.json()
      try {
        stringSchema.parse(username);
        stringSchema.parse(phone);
        stringSchema.parse(email);
        stringSchema.parse(discordId);
    console.log("Creating user using", email,phone, discordId,username);
    
    const user = new UserModel({
     email,phone , discordId ,username, githubDetails
    });
    userSchema.parse(user);
    await user.save();
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating user:', error);
   return NextResponse.json({message: error})
  } 
}

export { handler as POST};



