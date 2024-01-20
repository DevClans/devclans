import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { z } from 'zod';

const client = new MongoClient(process.env.MONGO_URL!);

async function handler(req:Request) {
  await dbConnect();

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("user");
    const collection = db.collection("projects");
    
    const { searchTerm } = await req.json();
    const stringSchema = z.string(searchTerm);
if(stringSchema){
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
