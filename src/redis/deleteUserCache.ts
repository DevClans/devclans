import { UserRedisKeys } from "@/types/mongo/user.types";
import redisClient from "./config";

const deleteUserCache = async (userId: string) => {
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
export default deleteUserCache;
