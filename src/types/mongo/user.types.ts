import { MemberLevelType } from "./../../lib/memberLevel";
import { contactMethodsMap, contactMethodsType } from "@/lib/contactMethods";
import { skills } from "@/lib/skills";
import mongoose from "mongoose";

// Define the User interface extending mongoose.Document
export interface UserProps extends UserTeamItemProps {
  skillLevel?: MemberLevelType;
  domain?: "frontend" | "backend" | "fullstack" | "designer" | "other"; // domain you are currenty studying
  bio?: string;
  phone?: string;
  email?: string;
  socials: {
    twitter: string;
    telegram: string;
    linkedin: string;
    website: string;
  };
  skills: Array<(typeof skills)[number]>;
  ownedProjects: mongoose.Types.ObjectId[];
  contributedProjects: mongoose.Types.ObjectId[];
  questions: {
    currentCompany?: string;
    careerGoal?: string;
    proudAchievement?: string;
    recentWork?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type UserDiscordDetailsProps = {
  _id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  accent_color?: string;
  bot?: boolean;
  global_name?: string;
  banner?: string;
  verified?: boolean;
  email?: string;
};

export type UserGithubDetailsProps = {
  accessToken?: string;
  refreshToken?: string;
  username: string;
  avatar_url?: string;
  node_id?: string;
  name?: string;
  company?: string;
  bio?: string;
  twitter_username?: string;
  login: string;
};

export type UserTeamItemProps = {
  githubId: string;
  discordId: string;
  discordDetails: UserDiscordDetailsProps;
  githubDetails: UserGithubDetailsProps;
  username?: string;
  avatar?: string;
  _id: mongoose.Types.ObjectId;
  contactMethod: contactMethodsType;
  contactMethodId: string;
};

export type UserMongoProps = Omit<UserProps, "githubId">;

export type ContactDetailsProps = {
  name: string;
  contactId: string;
  contactMethod: keyof typeof contactMethodsMap;
  icon?: any;
};

export type UserTeamProps = { team: UserTeamItemProps[] };
