import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/mongodb/models";
import { redisGet, redisSet } from "@/redis/basicRedis";
import { UserProps, UserRedisKeys } from "@/types/mongo/user.types";
import { zodDiscordUsername } from "@/zod/zod.common";
import { NextResponse } from "next/server";

const handler = async (
  req: Request,
  { params }: { params: { user: string } },
  res: Response
) => {
  try {
    await dbConnect();
    console.log("user route", params);
    const user = zodDiscordUsername.parse(params.user);
    // get user devlinks from cache
    let devlinks: Partial<UserProps> | null = await redisGet(
      UserRedisKeys.links,
      user
    );
    // if not in cache, get from db
    if (!devlinks) {
      console.log("cache miss, getting from db");
      // get from db
      devlinks = (await UserModel.findOne(
        { "discordDetails.username": user },
        {
          discordId: 1,
          githubId: 1,
          socials: 1,
          email: 1,
          theme: 1,
          "discordDetails.avatar": 1,
          "discordDetails.username": 1,
          "discordDetails.global_name": 1,
          "githubDetails.avatar_url": 1,
          "githubDetails.login": 1,
          ownedProjects: 1,
        }
      )
        .populate("ownedProjects", "title desc _id imgs skills domain")
        .lean()) as Partial<UserProps> | null;
      // ! this data is already stored in different areas, we are repeating it here. will need to change this as users increase
      // set in cache
      if (devlinks) {
        await redisSet(UserRedisKeys.links, user, devlinks);
      }
    }
    console.log("devlinks", devlinks);
    // return devlinks
    return NextResponse.json(devlinks);
  } catch (error) {
    console.error("error in user route", error);
    return NextResponse.json({ message: "error in user route", error });
  }
};

export { handler as GET };
