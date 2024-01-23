import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/model/schema";

async function handler(req: Request) {
    const currentTime: number = Date.now();
    console.log(currentTime);
    
    await dbConnect();
  
    const { userId } = await req.json();
  
  
    try {
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ message: 'Invalid user parameter' });
          }


   
      const user = await UserModel.findOne({ username: userId});
      console.log(user);
      return NextResponse.json({message:user})

  
      

  
  
  
    }
  
   
    catch (error) {
      console.error('Error liking project for user:', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  }
  
  export { handler as PUT };
  