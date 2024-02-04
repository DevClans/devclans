import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { adapter } from "./adapterFunctions";
import { UserDiscordDetailsProps } from "@/types/mongo/user.types";
import { zodUserDiscordDetailsSchema } from "@/zod/zod.common";
import { Fetch } from "../fetchApi";

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify email guilds guilds.members.read",
        },
      },
      async profile(profile: any, tokens: any) {
        const { id } = profile;
        const { access_token } = tokens;
        const isMember = await Fetch({
          endpoint: `/middleware/checkServerMembership?discordId=${id}`,
          method: "GET",
          token: access_token,
        });
        console.log("isMember in profile", isMember);
        // console.log("access token", tokens);
        const isData = zodUserDiscordDetailsSchema.safeParse({
          ...profile,
          _id: id,
        });
        let discordDetails: UserDiscordDetailsProps | null = null;
        if (!isData.success) throw new Error(isData.error.message);
        discordDetails = isData.data;
        return {
          id: id,
          username: profile.username,
          discordId: id,
          discordDetails,
          email: profile.email,
          emailVerified: profile.verified,
          isMember: isMember?.isMember,
        };
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, token, user }: any) {
      // console.log("SESSION", session, "TOKEN", token, "USER", user);
      session.user = {
        _id: user.id,
        username: user.username || user.discordDetails?.username,
        avatar: user.discordDetails?.avatar,
        discordId: user.discordId,
      } as any;
      return session;
    },
    // https://next-auth.js.org/configuration/callbacks#sign-in-callback
    signIn: async ({ user, account, profile, email, credentials }: any) => {
      if (process.env.NODE_ENV === "development") return true;
      // console.log("signIn", user, account, profile, email, credentials);
      const isMember = await Fetch({
        endpoint: `/middleware/checkServerMembership?discordId=${profile?.id}`,
        method: "GET",
        token: account?.access_token,
      });
      console.log("isMember", isMember);
      return isMember?.isMember || false;
    },
  },
  events: {
    signIn: async (message) => {
      console.log("IS NEW USER? => ", message.isNewUser);
    },
  },
};
