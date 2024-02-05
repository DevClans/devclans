// pages/api/user/profile.ts
import { UserModel } from "@/mongodb/models";
import { NextRequest, NextResponse } from "next/server";
import {
  zodMongoId,
  zodUserDataSchema,
  zodUserFormSchema,
  zodUserSearchInfoSchema,
} from "@/zod/zod.common";
import { UserFormProps, UserRedisKeys } from "@/types/mongo/user.types";
import { Types } from "mongoose";
import dbConnect from "@/lib/dbConnect";
import redisClient from "@/redis/config";

const deleteUserDataCache = async (userId: string) => {
  // this can be deleted based on if the field is updated
  return Promise.all([
    redisClient.hdel(UserRedisKeys.list, userId).then((res) => {
      console.log("Deleted user list cache:", res);
    }),
    redisClient.hdel(UserRedisKeys.data, userId).then((res) => {
      console.log("Deleted user data cache:", res);
    }),
    redisClient.hdel(UserRedisKeys.github, userId).then((res) => {
      console.log("Deleted user github cache:", res);
    }),
  ]);
};

const updateUserCache = async (userId: string, formData: UserFormProps) => {
  try {
    const listData = zodUserSearchInfoSchema.partial().parse(formData);
    const userData = zodUserDataSchema.partial().parse(formData);
    console.log("User data:", userData);
    console.log("User list data:", listData);
    // Create a new pipeline for batch operations
    const pipeline = redisClient.pipeline();

    // Queue up the batch update operations
    pipeline.hset(UserRedisKeys.list, userId, JSON.stringify(listData));
    pipeline.hset(UserRedisKeys.data, userId, JSON.stringify(userData));

    // Execute the batch operations
    await pipeline.exec();

    console.log("User cache updated successfully.");
  } catch (error) {
    console.error("Error updating user cache:", error);
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  // Ensure the user is authenticated
  try {
    await dbConnect();
    console.log("Updating user profile...");
    const body = await req.json();
    const { id, data }: { id: string; data: UserFormProps } = body;
    const userDetails = zodUserFormSchema.parse(data);
    console.log("User details:", userDetails);
    const userId = zodMongoId.parse(id, {
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
    console.log("Updated user profile:", updatedUser);
    // clear the cache if exists
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("Update user data cache...");
    await updateUserCache(userId, updatedUser);
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
