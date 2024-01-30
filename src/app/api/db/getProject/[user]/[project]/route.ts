import { NextResponse } from "next/server";
import { stringSchema, zodProjectFormSchema } from "@/zod/zod.common";
import dbConnect from "@/lib/dbConnect";
import { ProjectModel, UserModel } from "@/model/schema";
import { isValidObjectId } from 'mongoose';


async function handler(req:Request,{ params }:{ params : { user: string, project: string }}) {
  try{


    await dbConnect();

    const { user, project } = params;
    stringSchema.parse(user);
    stringSchema.parse(project);
    if (!user || typeof user !== 'string') {
        return NextResponse.json({ message: 'Invalid user parameter' });
      }
      const u = await UserModel.findOne({username:user});
      if (!isValidObjectId(project)) {
        return NextResponse.json({ message: 'Invalid project ID' });
      }
  
  

   
    // const projects = await ProjectModel.findOne({

    //     owner: u._id,
    //       _id: project
 
    //   });
     

    const projects = await ProjectModel.findById(project);
     
      return  NextResponse.json(projects);
}
catch(error){
  return NextResponse.json(error);
}
}

export { handler as GET };
