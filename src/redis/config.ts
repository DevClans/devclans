import { env } from "node:process";
import { Redis } from "ioredis";
console.log("process.env.ENV", process.env.NODE_ENV);
const redisClient = new Redis(
  process.env.NODE_ENV == "development" || env.NODE_ENV == "development"
    ? "redis://localhost:6379"
    : (process.env.REDIS_URL as string) || (env.REDIS_URL as string)
);

redisClient.on("connect", () => {
  console.log("Redis connected", process.env.PORT);
});
redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});
export default redisClient;
