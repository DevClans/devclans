import { redisGet, redisSet } from "@/redis/basicRedis";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
enum DiscordApi {
  limit = "discordApiLimit",
}
async function isDiscordServerMember(
  accessToken: string,
  serverId: string[],
  userDiscordId: string
): Promise<{ isMember: boolean; reason?: string }> {
  try {
    // try getting limit from redis
    const data = await redisGet(DiscordApi.limit, userDiscordId);
    if (data) {
      console.log("user rate limited by discord ", userDiscordId, data);
      return { isMember: false, reason: "ratelimit" };
    }
    for (const id of serverId) {
      const response = await fetch(
        `https://discord.com/api/users/@me/guilds/${id}/member`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const discordApiLimit: Record<string, string | null> = {};
      const remaining = response.headers.get("x-ratelimit-remaining");
      console.log(
        "discord guild response =>",
        response.headers.get("x-ratelimit-limit"),
        remaining,
        response.headers.get("x-ratelimit-reset-after"),
        response.headers.get("x-ratelimit-reset")
      );
      if (typeof remaining == "string" && parseInt(remaining) === 0) {
        const resetAfter = response.headers.get("x-ratelimit-reset-after");
        console.log("rate limited by discord", userDiscordId);
        discordApiLimit["limit"] = response.headers.get("x-ratelimit-limit");
        discordApiLimit["reset"] = response.headers.get("x-ratelimit-reset");
        discordApiLimit["reset-after"] = resetAfter;
        discordApiLimit["remaining"] = remaining;
        console.log(
          "setting discord limit in redis",
          discordApiLimit,
          "for user",
          userDiscordId
        );
        await redisSet(
          DiscordApi.limit,
          userDiscordId,
          discordApiLimit,
          resetAfter ? parseInt(resetAfter) : 60
        );
        return { isMember: false, reason: "ratelimit" };
      }
      const data = await response.json(); // Get the response data
      console.log("is member data = >", data); // Log the response data to see the details
      if (data && response.status === 200) {
        return {
          isMember: typeof data == "object" && "user" in data,
          reason: "notMember",
        };
      }
    }
    return { isMember: false, reason: "notMember" };
  } catch (error) {
    console.error("Error checking server membership:", error);
    return { isMember: false, reason: "serverError" };
  }
}

// TODO add proper checks
const zodDiscordAccessTOken = z.string({
  required_error: "Access Token is required",
  invalid_type_error: "Access Token must be a string",
});
const zodDiscordId = z.string({
  required_error: "Discord ID is required",
  invalid_type_error: "Discord ID must be a string",
});

async function checkServerMembership(req: NextRequest, res: NextResponse) {
  try {
    const userDiscordId = zodDiscordId.parse(
      req.nextUrl.searchParams.get("discordId")
    ); // Replace with the actual Discord user ID you want to check
    const accessToken = zodDiscordAccessTOken.parse(
      req.headers.get("authorization")?.replace("Bearer ", "")
    );
    console.log("accessToken in server", accessToken, userDiscordId);
    // Add regex validation check for accessToken

    const serverId = [
      "1171768226691162162",
      "1187795083387474000",
      "1208061297858584606",
    ]; // Replace with the actual Discord server ID
    // "662267976984297473" id for false check
    const { isMember, reason } = await isDiscordServerMember(
      accessToken,
      serverId,
      userDiscordId
    );
    return NextResponse.json(
      {
        message: reason,
        isMember,
      },
      {
        status: isMember
          ? 200
          : reason === "ratelimit"
          ? 429
          : reason === "serverError"
          ? 500
          : 403,
      }
    );
  } catch (error) {
    console.error("Error checking server membership:", error);
    return NextResponse.json({ message: "Error checking server membership" });
  }
}

export { checkServerMembership as GET, checkServerMembership as POST };
