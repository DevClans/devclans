import { env } from "node:process";
import { Redis } from "ioredis";

const redisClient = new Redis("redis://localhost:6379");

redisClient.on("connect", () => {
  console.log("Redis connected", process.env.PORT);
});
redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});
export default redisClient;
