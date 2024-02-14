import {
  UserFormProps,
  UserProps,
  UserRedisKeys,
} from "@/types/mongo/user.types";
import {
  zodUserGithubDetailsSchema,
  zodProjectDataSchema,
  zodProjectSearchInfoSchema,
  zodRepoDetailsSchema,
  zodUserDataSchema,
  zodUserSearchInfoSchema,
} from "@/zod/zod.common";
import redisClient from "./config";
import {
  ProjectFormProps,
  ProjectProps,
  ProjectRedisKeys,
} from "@/types/mongo/project.types";
import { redisSet } from "./basicRedis";

export default async function updateAllCache(
  id: string,
  formData: UserFormProps | UserProps | ProjectProps | ProjectFormProps,
  type: "users" | "projects" = "users",
  updateGithubCache: boolean = false
) {
  try {
    const isProject = type === "projects";
    const Enum = isProject ? ProjectRedisKeys : UserRedisKeys;
    // type Props = typeof isProject extends true ? ProjectFormProps : UserFormProps;
    const ZodDataSchema = isProject
      ? zodProjectDataSchema
      : zodUserSearchInfoSchema;
    const ZodSearchSchema = isProject
      ? zodProjectSearchInfoSchema
      : zodUserSearchInfoSchema;
    const ZodGithubSchema = isProject
      ? zodRepoDetailsSchema
      : zodUserGithubDetailsSchema;
    const searchInfoCache = ZodSearchSchema.partial().parse(formData);
    const dataCache = ZodDataSchema.partial().parse(formData);
    const githubCache = ZodGithubSchema.partial().parse(formData);
    console.log(" data:", dataCache);
    console.log(" list data:", searchInfoCache);
    // Create a new pipeline for batch operations
    const pipeline = redisClient.pipeline();

    // Queue up the batch update operations
    pipeline.set(Enum.list + ":" + id, JSON.stringify(searchInfoCache));
    pipeline.set(Enum.data + ":" + id, JSON.stringify(dataCache));
    pipeline.expire(Enum.data + ":" + id, 60 * 60 * 3);
    pipeline.expire(Enum.list + ":" + id, 60 * 60 * 3); // 3 hrs
    if (updateGithubCache) {
      pipeline.set(Enum.github + ":" + id, JSON.stringify(githubCache));
      pipeline.expire(Enum.github + ":" + id, 60 * 60 * 3);
    }

    // Execute the batch operations
    await pipeline.exec();

    console.log(" cache updated successfully.");
  } catch (error) {
    // TODO maybe if we fail we should clear cache and wait for other requests to update cache
    console.error("Error updating  cache:", error);
  }
}

export async function updateUserDataCache(
  userId: string,
  formData: UserFormProps
) {
  // overwrite existing user data cache
  if (!userId) {
    return console.error(
      "Failed updating user data cache, User ID is required"
    );
  }
  try {
    const userData = zodUserDataSchema.partial().parse(formData);
    console.log("User data:", userData);
    // Update the user data cache
    await redisSet(UserRedisKeys.data, userId, userData);
  } catch (error) {
    console.error("Error updating user data cache:", error);
  }
}
