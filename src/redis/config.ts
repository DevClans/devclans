import { env } from "node:process";
import { Redis } from "ioredis";
const redisClient = new Redis(env.REDIS_URL as string);
redisClient.on("connect", () => {
  console.log("Redis connected", process.env.PORT);
});
redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});
export default redisClient;
