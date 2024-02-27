import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { adapter } from "./adapterFunctions";
import { Fetch } from "../fetchApi";
import { zodUserDiscordDetailsSchema } from "@/zod/zod.common";
import { UserDiscordDetailsProps } from "@/types/mongo/user.types";

const isServerMember = async (discordId: string, token: string) => {
  return await Fetch({
    endpoint: `/middleware/checkServerMembership?discordId=${discordId}`,
    method: "GET",
    token: token,
    needError: true,
  });
};

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "identify email guilds guilds.members.read",
          // prompt: "consent",
        },
      },
      async profile(profile: any, tokens: any) {
        const { id } = profile;
        // const { access_token, expires_in } = tokens;
        // console.log("tokens in profile", tokens);
        // ? not checking here as the limit is 5 per user and checking multiple times will lead to rate limit
        // const isMember = await isServerMember(id, access_token);
        // console.log("isMember in profile", isMember);
        // console.log("access token", tokens);
        const isData = zodUserDiscordDetailsSchema.safeParse({
          ...profile,
          _id: id,
        });
        let discordDetails: UserDiscordDetailsProps | false =
          isData.success && isData.data;
        console.log(
          "discordDetails in profile",
          isData.success || isData.error
        );
        // if (!isData.success) throw new Error(isData.error.message);
        // discordDetails = isData.data;
        return {
          id: id,
          username: profile.username,
          discordId: id,
          discordDetails: { ...(discordDetails || profile), _id: id },
          email: profile.email,
          emailVerified: profile.verified,
          contactMethod: "discord",
          contactMethodId: id,
          createdAt: new Date().toISOString(),
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
        displayName:
          user.discordDetails?.global_name || user.discordDetails?.username,
        avatar: user.discordDetails?.avatar,
        discordId: user.discordId,
        repos: user.githubDetails?.installId && (user.repos || []),
        githubId:
          user.githubDetails?.accessToken &&
          (user.githubId || user.githubDetails?.login), // add githubId if user has connected github
      } as any;
      return session;
    },
    // https://next-auth.js.org/configuration/callbacks#sign-in-callback
    signIn: async ({ user, account, profile, email, credentials }: any) => {
      if (process.env.NODE_ENV === "development") return true;
      if (account.provider != "discord") {
        return "/error?error=betaNotAvailable";
      }
      // console.log("signIn", user, account, profile, email, credentials);
      const isMember = await isServerMember(profile.id, account.access_token);
      console.log("isMember =>", isMember);
      if (!isMember || !isMember?.isMember) {
        return "/error?error=" + isMember?.message || "notMember";
      }
      return true;
    },
  },
  pages: {
    newUser: "/user/new",
    error: "/error",
  },
  events: {
    signIn: async (message) => {
      console.log("IS NEW USER? => ", message.isNewUser);
    },
  },
};
