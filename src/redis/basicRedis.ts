import { decrypt } from "@/utils/EncryptFunctions";
import { encrypt } from "@/utils/EncryptFunctions";
import { UserRedisKeys } from "@/types/mongo/user.types";
import redisClient from "./config";
import { ChainableCommander, Redis } from "ioredis";

const toSecure = [UserRedisKeys.accessToken, UserRedisKeys.installId];

export const redisSet = async (
  enumVal: any,
  key: string,
  value: any,
  expiry: number = 3600 * 3, // 3hrs default for now
  redis: Redis | ChainableCommander = redisClient
) => {
  try {
    if (!enumVal || !key || !value) return;
    if (
      toSecure.includes(enumVal) &&
      (typeof value == "string" || typeof value == "number")
    ) {
      value = encrypt(value.toString());
    } else value = JSON.stringify(value);
    const id = enumVal + ":" + key;
    console.log("setting data in redisSet", typeof redis);
    await redis.set(id, value);
    await redis.expire(id, expiry);
  } catch (error) {
    console.log(error, "failed setting data in redisSet", enumVal, key);
  }
};

export const redisGet = async (
  enumVal: any,
  key: string,
  redis: Redis | ChainableCommander = redisClient
) => {
  try {
    if (!key || !enumVal) return;
    const a = await redis.get(enumVal + ":" + key);
    if (!(a && typeof a == "string")) {
      return a;
    }
    if (toSecure.includes(enumVal)) {
      return decrypt(a);
    }
    return JSON.parse(a);
  } catch (error) {
    console.log(error, " error in redisGet", enumVal, key);
  }
};

export const redisGetMany = async (
  enumVal: any,
  keys: string[],
  redis?: Redis | ChainableCommander
) => {
  const found: any[] = []; // will be data from cache
  const notFound: string[] = []; // will be keys not found in cache
  const res = {
    found,
    notFound,
  };
  try {
    if (!Array.isArray(keys) || !enumVal) {
      console.log("missing params in redisGetMany");
      throw new Error("missing params in redisGetMany");
    }
    await Promise.all(
      keys.map(async (key) => {
        const result = await redisGet(enumVal, key, redis);
        if (result) {
          found.push(result);
        } else {
          notFound.push(key);
        }
      })
    );
    console.log("success in redisGetMany");
  } catch (error) {
    console.log(error, " error in redisGetMany", enumVal, keys);
  }
  return res;
};

export const redisSetMany = async (
  enumVal: any,
  keyValuePairs: [string, any][]
) => {
  try {
    if (!Array.isArray(keyValuePairs) || !enumVal) {
      console.log("missing params in redisSetMany");
      throw new Error("missing params in redisSetMany");
    }
    await Promise.all(
      keyValuePairs.map(async ([key, value]) => {
        await redisSet(enumVal, key, value);
      })
    );
    console.log("success in redisSetMany");
  } catch (error) {
    console.log(error, " error in redisSetMany", enumVal, keyValuePairs);
  }
};
