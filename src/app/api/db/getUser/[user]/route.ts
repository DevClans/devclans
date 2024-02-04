import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { stringSchema, userSchema } from "@/zod/zod.common";

async function handler(req: Request, { params }: { params: { user: string } }) {
  try {
    await dbConnect();

    const user = params.user;
    stringSchema.parse(user);

    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const u = await UserModel.findOne({
      username: user,
    });
    userSchema.parse(u);

    return NextResponse.json(u);
  } catch (error) {
    return NextResponse.json(error);
  }
}
export { handler as GET };
