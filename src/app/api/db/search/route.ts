import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_URL!);

async function handler(req:Request) {
  await dbConnect();

  try {
    await client.connect();
    console.log("connected");
    const db = client.db("user");
    const collection = db.collection("projects");
    
    const { searchTerm } = await req.json();
    
    const pipeline = [
      {
        $search: {
          index: "projects",
          text: {
            query: searchTerm,
            path:{
                'wildcard':'*'
            },
            fuzzy:{}
          },
        },
      },
    ];

    const searchResults = await collection.aggregate(pipeline).toArray();

    return NextResponse.json({ results: searchResults });
  } catch (error) {
    console.error('Error searching:', error);
   return  NextResponse.json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}

export { handler as POST };
