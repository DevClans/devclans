// pages/api/user/profile.ts
import { UserModel } from "@/mongodb/models";
import { NextRequest, NextResponse } from "next/server";
import {
  zodMongoId,
  zodUserFormSchemaObj,
  zodUserFormSuperRefine,
} from "@/zod/zod.common";
import { UserFormProps } from "@/types/mongo/user.types";
import { Types } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import updateAllCache from "@/redis/updateUserCache";

export async function POST(
  req: NextRequest,
  { params }: { params: { user: string } },
  res: NextResponse
) {
  console.log("Updating user profile...");
  // Ensure the user is authenticated
  try {
    await dbConnect();
    const body = await req.json();
    const user = params?.user;
    const { data }: { id: string; data: UserFormProps } = body;
    const userDetails = zodUserFormSchemaObj
      .partial()
      .superRefine(zodUserFormSuperRefine)
      .parse(data);
    console.log("User details:", userDetails);
    const userId = zodMongoId.parse(user, {
      path: ["id"],
      errorMap: (issue) => {
        if (issue.code === "custom") {
          return { message: issue.message || "Invalid ID" };
        }
        return { message: "Invalid user ID" };
      },
    });
    console.log("User ID:", userId);
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $set: userDetails },
      { new: true }
    );
    console.log("Updated user profile:", Boolean(updatedUser));
    // clear the cache if exists
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("Update user data cache...");
    await updateAllCache(userId, updatedUser, "users", false, true);
    console.log("User data cache updated");
    // we can also add the data here in cache
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
