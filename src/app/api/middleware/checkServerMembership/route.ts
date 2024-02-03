import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

async function isDiscordServerMember(
  accessToken: string,
  serverId: string[]
): Promise<boolean> {
  try {
    for (const id of serverId) {
      const response = await fetch(
        `https://discord.com/api/users/@me/guilds/${id}/member`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json(); // Get the response data
      console.log("is member data = >", data); // Log the response data to see the details
      if (data && response.status === 200) {
        return typeof data == "object" && "user" in data;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking server membership:", error);
    return false;
  }
}

// TODO add proper checks
const zodDiscordAccessTOken = z.string();
const zodDiscordId = z.string();

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

    const serverId = ["1187795083387474000"]; // Replace with the actual Discord server ID
    // "662267976984297473" id for false check
    const isMember = await isDiscordServerMember(accessToken, serverId);

    if (isMember) {
      return NextResponse.json({
        message:
          "User is a member of the required Discord server and has the specified Discord ID",
        isMember,
      });
    } else {
      return NextResponse.json(
        {
          message:
            "User is not a member of the required Discord server or does not have the specified Discord ID",
          isMember,
        },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error checking server membership:", error);
    return NextResponse.json({ message: "Error checking server membership" });
  }
}

export { checkServerMembership as GET };
