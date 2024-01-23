import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { UserModel } from "@/model/schema";

async function handler(req:Request,{ params }:{ params : { skill: string }}) {
    try{
    await dbConnect();
    
    const skill  = params.skill;
    if (!skill || typeof skill !== 'string') {
        return NextResponse.json({ message: 'Invalid skill parameter' });
      }

   
    const u = await UserModel.find({
      skills : skill
    });
      
     
      return  NextResponse.json(u);
}
catch(error){
    return NextResponse.json(error);
}
}

export { handler as GET }