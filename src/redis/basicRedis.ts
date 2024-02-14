import redisClient from "./config";

export const redisSet = async (
  enumVal: any,
  key: string,
  value: any,
  expiry?: number
) => {
  try {
    if (!enumVal || !key || !value) return;
    await redisClient.set(enumVal + ":" + key, JSON.stringify(value));
    await redisClient.expire(enumVal + ":" + key, expiry || 3600 * 3); // 3hrs default for now
  } catch (error) {
    console.log(error, "failed setting data in redisSet", enumVal, key);
  }
};

export const redisGet = async (enumVal: any, key: string) => {
  try {
    if (!key || !enumVal) return;
    const a = await redisClient.get(enumVal + ":" + key);
    if (!(a && typeof a == "string")) {
      return a;
    }
    return JSON.parse(a);
  } catch (error) {
    console.log(error, " error in redisGet", enumVal, key);
  }
};

export const redisGetMany = async (enumVal: any, keys: string[]) => {
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
        const result = await redisGet(enumVal, key);
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
