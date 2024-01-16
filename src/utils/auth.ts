import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClient from "./mongodb.config";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoClient) as Adapter,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  
};
