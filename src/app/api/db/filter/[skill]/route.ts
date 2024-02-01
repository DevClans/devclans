import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { userSchema } from "@/zod/zod.common";

async function handler(
  req: Request,
  { params }: { params: { skill: string } }
) {
  try {
    await dbConnect();

    const skill = params.skill;
    if (!skill || typeof skill !== "string") {
      return NextResponse.json({ message: "Invalid skill parameter" });
    }

    const u = await UserModel.find({
      skills: skill,
    });

    userSchema.parse(u);

    return NextResponse.json(u);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export { handler as GET };
