import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { adapter } from "./adapterFunctions";
import { UserDiscordDetailsProps } from "@/types/mongo/user.types";
import { zodUserDiscordDetailsSchema } from "@/zod/zod.common";

type MyUser = {
  id: string;
  username: string;
  avatar: string;
  accessToken: string;
};

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      async profile(profile: any, tokens: any) {
        const { id } = profile;
        // const { accessToken } = tokens;
        const isData = zodUserDiscordDetailsSchema.safeParse({
          ...profile,
          _id: id,
        });
        let discordDetails: UserDiscordDetailsProps | null = null;
        if (!isData.success) throw new Error(isData.error.message);
        discordDetails = isData.data;
        return {
          id: id,
          discordId: id,
          discordDetails,
          email: profile.email,
          emailVerified: profile.verified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      const { token, user } = params;

      if (user) {
        const { id, username, avatar, accessToken } = user as MyUser;
        token.id = id;
        token.username = username;
        token.avatar = avatar;
        token.discordAccessToken = accessToken;
      }

      return token;
    },
    async session({ session, token, user }: any) {
      // console.log("SESSION", session, "TOKEN", token, "USER", user);
      session.user = {
        _id: user.id,
        username: user.discordDetails?.username,
        avatar: user.discordDetails?.avatar,
        discordId: user.discordId,
      } as any;
      return session;
    },
    // https://next-auth.js.org/configuration/callbacks#sign-in-callback
    signIn: async ({ user, account, profile, email, credentials }) => {
      console.log("signIn");
      // TODO check if is discord member
      return true;
    },
  },
  events: {
    signIn: async (message) => {
      console.log("IS NEW USER? => ", message.isNewUser);
    },
  },
};
