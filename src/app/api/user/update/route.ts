// pages/api/user/profile.ts
import { UserModel } from "@/mongodb/models";
import { NextRequest, NextResponse } from "next/server";
import { zodMongoId, zodUserFormSchema } from "@/zod/zod.common";
import { UserFormProps } from "@/types/mongo/user.types";

export async function POST(req: NextRequest, res: NextResponse) {
  // Ensure the user is authenticated
  try {
    console.log("Updating user profile...");
    const body = await req.json();
    const { id, data }: { id: string; data: UserFormProps } = body;
    const userDetails = zodUserFormSchema.parse(data);
    console.log("User details:", userDetails);
    console.log("User ID:", id);
    const userId = zodMongoId.parse(id, {
      path: ["id"],
      errorMap: (issue) => {
        if (issue.code === "custom") {
          return { message: issue.message || "Invalid ID" };
        }
        return { message: "Invalid user ID" };
      },
    });
    const updatedUser = await UserModel.updateOne({ _id: userId }, userDetails);
    console.log("Updated user profile:", updatedUser);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    // console.error("Error updating user profile:", error);
    console.error("Error message:", error?.message);
    console.error("Zod parse error message:", error?.issues?.[0]?.message);
    return NextResponse.json(null, {
      status: 500,
      statusText:
        error?.issues?.[0]?.message ||
        error?.message ||
        "Error updating user profile",
    });
  }
}
