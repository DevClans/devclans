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
    pipeline.hset(Enum.list, id, JSON.stringify(searchInfoCache));
    pipeline.hset(Enum.data, id, JSON.stringify(dataCache));
    if (updateGithubCache) {
      pipeline.hset(Enum.github, id, JSON.stringify(githubCache));
    }

    // Execute the batch operations
    await pipeline.exec();

    console.log(" cache updated successfully.");
  } catch (error) {
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
    await redisClient.hset(
      UserRedisKeys.data,
      userId,
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error("Error updating user data cache:", error);
  }
}
