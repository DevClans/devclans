import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";

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
      "https://discord.com/api/v10/users/@me/guilds"
      // {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // }
    );

    if (!response.ok) {
      // Handle error
      console.error("Discord API error:", response.status, response.statusText);
      return false;
    }

    const guilds = await response.json();
    return guilds.some((guild: any) => guild.id === serverId);
  } catch (error) {
    // Handle any other errors
    console.error("Error checking server membership:", error);
    return false;
  }
}

async function checkServerMembership(req: NextRequest, res: NextResponse) {
  // const session = await getSession({ req: req as any });

  // if (!session || !session.user || !("discordAccessToken" in session.user)) {
  //   // User is not authenticated or does not have discordAccessToken
  //   return new NextResponse("User not authenticated", { status: 401 });
  // }

  // const myUser = session.user as MyUser; // Explicit cast to MyUser

  // const serverId = "1171768226691162162"; // Replace with the actual Discord server ID
  // const isMember = true;
  // // await isDiscordServerMember(
  // //   myUser.discordAccessToken!,
  // //   serverId
  // // );

  // if (isMember) {
  //   // User is a member of the required Discord server
  //   return new NextResponse("User is a member of the required Discord server", {
  //     status: 200,
  //   });
  // } else {
  //   // User is not a member of the required Discord server
  //   return new NextResponse(
  //     "User is not a member of the required Discord server",
  //     { status: 403 }
  //   );
  // }
  return new NextResponse("User is a member of the required Discord server", {
    status: 200,
  });
}

export { checkServerMembership as GET };
