import { NextResponse } from "next/server";
import { UserModel } from "@/mongodb/models";
import dbConnect from "@/utils/mongoose.config";
import redisClient from "@/redis/config";

async function handler(req: Request) {
  try {
    await dbConnect();

    // Check if the users data exists in Redis
    const usersFromCache = await redisClient.hgetall("users");

    if (Object.keys(usersFromCache).length > 0) {
      console.log("users from cache");
      for (const key in usersFromCache) {
        if (Object.prototype.hasOwnProperty.call(usersFromCache, key)) {
          const user = usersFromCache[key];
          // console.log("user", user);
          usersFromCache[key] = JSON.parse(user);
        }
      }
      return NextResponse.json(Object.values(usersFromCache));
    }

    const users = await UserModel.find({});
    console.log("users from db");
    const usersObject: any = {};
    users.forEach((user) => {
      usersObject[user._id] = JSON.stringify(user);
    });

    redisClient.hmset("users", usersObject); // to set multiple keys

    return NextResponse.json(users);
  } catch (error) {
    console.log("error in user route", error);
    return NextResponse.json({ message: "error in user route" });
  }
}
export { handler as GET };
