// app/api/middleware/checkServerMembership/page.ts

import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

type MyUser = {
  id: string;
  username: string;
  avatar: string;
  accessToken: string;
  discordAccessToken?: string;
};

async function isDiscordServerMember(
  accessToken: string,
  serverId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${serverId}/members/@me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json(); // Get the response data
    console.log(data); // Log the response data to see the details

    return response.ok;
  } catch (error) {
    console.error("Error checking server membership:", error);
    return false;
  }
}

export default async function checkServerMembership(
  req: NextRequest,
  res: NextResponse,
  userDiscordId: string
) {
  const session = await getSession({ req: req as any });

  if (!session || !session.user || !("discordAccessToken" in session.user)) {
    return new NextResponse("User not authenticated", { status: 401 });
  }

  const myUser = session.user as MyUser;

  const serverId = "1171768226691162162"; // Replace with the actual Discord server ID
  const isMember = await isDiscordServerMember(
    myUser.discordAccessToken!,
    serverId
  );

  if (isMember && myUser.id === userDiscordId) {
    return new NextResponse(
      "User is a member of the required Discord server and has the specified Discord ID",
      { status: 200 }
    );
  } else {
    return new NextResponse(
      "User is not a member of the required Discord server or does not have the specified Discord ID",
      { status: 403 }
    );
  }
}
