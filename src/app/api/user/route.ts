import { NextResponse } from "next/server";
import { UserModel } from "@/models/models";

async function handler(req: Request) {
  const user = await UserModel.find({});
  return NextResponse.json(user);
}
export { handler as GET };
