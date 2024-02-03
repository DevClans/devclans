import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import   GoogleProvider from "next-auth/providers/google";
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
      authorization: {
        params: { scope: 'identify email guilds' },
      },
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
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
    // signIn: async (user: any, account: any, profile: any) => {
    //   console.log("signIn");
    //   check if is discord member
    //   return false;
    // },
  },
  events: {
    signIn: async (message) => {
      console.log("IS NEW USER? => ", message.isNewUser);
    },
  },
};
