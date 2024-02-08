import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import   GoogleProvider from "next-auth/providers/google";
import { adapter } from "./adapterFunctions";
import { UserDiscordDetailsProps } from "@/types/mongo/user.types";
import { zodUserDiscordDetailsSchema } from "@/zod/zod.common";
import { Fetch } from "../fetchApi";


const isServerMember = async (discordId: string, token: string) => {
  const isMember = await Fetch({
    endpoint: `/middleware/checkServerMembership?discordId=${discordId}`,
    method: "GET",
    token: token,
  });
  return isMember?.isMember;
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
        },
      },
      async profile(profile: any, tokens: any) {
        const { id } = profile;
        const { access_token } = tokens;
        const isMember = await isServerMember(id, access_token);
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
          username: discordDetails.global_name || discordDetails.username,
          discordId: id,
          discordDetails,
          email: profile.email,
          emailVerified: profile.verified,
          isMember: isMember,
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

    // async redirect({ url="/explore/projects", baseUrl=" http://localhost:3000" }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) {
    //     console.log(`${baseUrl}${url}`)
    //     return `${baseUrl}${url}`
    //   }
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) {
    //     console.log("This is "+url);
    //     return url
    //   }
    //   return baseUrl
    // },
    // https://next-auth.js.org/configuration/callbacks#sign-in-callback


//     signIn: async ({ user, account, profile, email, credentials }: any) => {
//       // console.log("signIn", user, account, profile, email, credentials);
// if (process.env.NODE_ENV === "development") return true;
//       const isMember = await Fetch({
//         endpoint: `/middleware/checkServerMembership?discordId=${profile?.id}`,
//         method: "GET",
//         token: account?.access_token,
//       });
//       console.log("isMember", isMember);
//       return isMember?.isMember || false;
//     },


signIn: async ({ user, account, profile, email, credentials }: any) => {
  // if (process.env.NODE_ENV === "development") return true;
  if (account.provider != "discord") {
    return "/error?error=betaNotAvailable";
  }
  console.log("signIn", user, account, profile, email, credentials);
  const isMember = await Fetch({
    endpoint: `/middleware/checkServerMembership?discordId=${profile?.id}`,
    method: "GET",
    token: account?.access_token,
  });
  console.log("isMember", isMember);
  if (!isMember || !isMember?.isMember) {
    return "/error?error=notMember";
  }
  return true;
},

  },
  pages: {
    newUser: "/user/new",
  },
  events: {
    signIn: async (message) => {
      console.log("IS NEW USER? => ", message.isNewUser);
    },
  },
};
