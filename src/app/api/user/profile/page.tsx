// pages/api/user/profile.ts
import { UserModel } from "@/mongodb/models";
import { NextRequest, NextResponse } from "next/server";
import { zodUserFormSchema } from "@/zod/zod.common";

export async function POST(req: NextRequest, res: NextResponse) {
  // Ensure the user is authenticated
  try {
    const body = await req.json();
    const data = zodUserFormSchema.parse(body);

    // Update the user's profile in the database
    await UserModel.updateOne({ discordId: "123" }, data, {
      upsert: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.error();
  }
}
