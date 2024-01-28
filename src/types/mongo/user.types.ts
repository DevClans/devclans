import { MemberLevelType } from "./../../lib/memberLevel";
import { contactMethodsMap, contactMethodsType } from "@/lib/contactMethods";
import { ProjectDomainType } from "@/lib/domains";
import { skills } from "@/lib/skills";
import { zodUserFormSchema } from "@/zod/zod.common";
import mongoose from "mongoose";
import { z } from "zod";

// Define the User interface extending mongoose.Document
export interface UserProps extends UserTeamItemProps, UserSearchInfoProps {
  skillLevel?: MemberLevelType;
  domain?: ProjectDomainType; // domain you are currenty studying
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
  questions: UserQuestionsProps;
  createdAt: Date;
  updatedAt: Date;
}
export type UserQuestionsProps = {
  currentCompany?: string;
  careerGoal?: string;
  proudAchievement?: string;
  recentWork?: string;
};

export type UserDiscordDetailsProps = {
  _id: string; // discord id
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

export const userDiscordDetailsKeys: string[] = [
  "_id",
  "username",
  "discriminator",
  "avatar",
  "accent_color",
  "bot",
  "global_name",
  "banner",
  "verified",
  "email",
];

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
  readme?: string;
};
export const userGithubDetailsKeys: string[] = [
  "accessToken",
  "refreshToken",
  "username",
  "avatar_url",
  "node_id",
  "name",
  "company",
  "bio",
  "twitter_username",
  "login",
];

export type UserTeamItemProps = {
  githubId: string; // username
  discordId: string; // username
  username?: string;
  avatar?: string;
  _id: mongoose.Types.ObjectId;
  contactMethod: contactMethodsType;
  contactMethodId: string;
};

export const userTeamItemKeys: string[] = [
  "githubId",
  "discordId",
  "username",
  "avatar",
  "_id",
  "contactMethod",
  "contactMethodId",
];

export type UserSearchInfoProps = {
  avatar?: string;
  bio?: string;
  skills: Array<(typeof skills)[number]>;
  discordDetails: UserDiscordDetailsProps;
  githubDetails?: UserGithubDetailsProps;
  skillLevel?: MemberLevelType;
  username?: string;
  _id: mongoose.Types.ObjectId;
};
export const userSearchInfoKeys: string[] = [
  "avatar",
  "bio",
  "skills",
  "discordDetails",
  "githubDetails",
  "skillLevel",
  "username",
  "_id",
];

export type UserMongoProps = Omit<UserProps, "githubId">;

export type ContactDetailsProps = {
  name: string;
  contactId: string;
  contactMethod: keyof typeof contactMethodsMap;
  icon?: any;
};

export type UserTeamProps = { team: UserTeamItemProps[] };

export enum UserRedisKeys {
  list = "users",
  data = "userData",
  github = "userGithub",
  discord = "userDiscord",
  search = "userSearch",
}
export type UserFormProps = z.infer<typeof zodUserFormSchema>;
