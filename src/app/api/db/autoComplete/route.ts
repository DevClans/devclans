import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import  { stringSchema, projectArraySchema } from "@/zod/zod.common"

const client = new MongoClient(process.env.MONGO_URL!);

async function handler(req:Request) {
  await dbConnect();

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("user");
    const collection = db.collection("projects");
    
    const { searchTerm } = await req.json();
    const scheme = stringSchema.parse(searchTerm);
if(scheme){
    console.log("yes");
    const pipeline = [
      {
        $search: {
          index: "default",
          "autocomplete":{
            "query":searchTerm,
            "path":"title",
            "tokenOrder":"sequential"
          }
        },
      },
      {
        $limit:10
      },
      {
        $project:{
            "title":1
        }
      }
    ];

    const searchResults = await collection.aggregate(pipeline).toArray();
    projectArraySchema.parse(searchResults);



    return NextResponse.json({ results: searchResults });
  }
  else{
    return NextResponse.json({ message:"value should be string" });
  }
  } catch (error) {
    console.error('Error searching:', error);
   return  NextResponse.json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}

export { handler as POST };
