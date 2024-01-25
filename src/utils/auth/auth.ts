import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { adapter } from "./adapterFunctions";

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
    async session(params) {
      const { session, token } = params;
      session.user = token;
      return session;
    }
  },
  events: {},
};
