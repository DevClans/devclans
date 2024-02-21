import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  const a = await UserModel.updateOne(
    { username: "kshetezvinayak" },
    {
      $set: {
        "githubDetails.installId": 452617,
      },
    }
  );
  const d = await UserModel.findById("65d5d8f193350006db1e40fa");
  const b = await UserModel.findOne({ username: "kshetezvinayak" });
  const c = await UserModel.find({ username: "kshetezvinayak" });
  return NextResponse.json({ a, b, c });
}
