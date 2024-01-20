import { contactMethodsMap, contactMethodsType } from "@/lib/contactMethods";
import { skills } from "@/lib/skills";
import mongoose from "mongoose";

// Define the User interface extending mongoose.Document
export interface UserProps extends UserTeamItemProps {
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
  currentCompany?: string;
  careerGoal?: string;
  proudAchievement?: string;
  recentWork?: string;
  createdAt: Date;
  updatedAt: Date;
  githubAccessToken?: string;
}

export type UserMongoProps = Omit<UserProps, "githubId">;

export type ContactDetailsProps = {
  name: string;
  contactId: string;
  contactMethod: keyof typeof contactMethodsMap;
  icon?: any;
};

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

export type UserTeamItemProps = {
  githubId: string;
  discordId: string;
  discordDetails: UserDiscordDetailsProps;
  username?: string;
  avatar?: string;
  _id: mongoose.Types.ObjectId;
  contactMethod: contactMethodsType;
  contactMethodId: string;
};

export type UserTeamProps = { team: UserTeamItemProps[] };
