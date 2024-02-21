import { MemberLevelType } from "./../../lib/memberLevel";
import { contactMethodsMap, contactMethodsType } from "@/lib/contactMethods";
import { ProjectDomainType } from "@/lib/domains";
import {
  zodUserGithubDetailsSchema,
  zodUserDiscordDetailsSchema,
  zodUserFormSchema,
  zodUserSearchInfoSchema,
} from "@/zod/zod.common";
import mongoose, { Types } from "mongoose";
import { z } from "zod";
import { ProjectProps } from "./project.types";

// Define the User interface extending mongoose.Document
export type UserProps = UserTeamItemProps &
  UserSearchInfoProps & {
    isMember?: boolean;
    skillLevel?: MemberLevelType;
    domain?: ProjectDomainType; // domain you are currenty studying
    bio?: string;
    githubDetails: UserGithubDetailsProps;
    phone?: string;
    email?: string;
    socials: {
      twitter: string;
      telegram: string;
      linkedin: string;
      website: string;
    };
    ownedProjects: mongoose.Types.ObjectId[];
    contributedProjects: mongoose.Types.ObjectId[];
    questions: UserQuestionsProps;
    createdAt: Date;
    updatedAt: Date;
    repos: string[];
  };
export type UserQuestionsProps = {
  currentCompany?: string;
  careerGoal?: string;
  proudAchievement?: string;
  recentWork?: string;
};

export type UserProjectProps = {
  ownedProjects: ProjectProps[];
  contributedProjects: ProjectProps[];
};

export type UserDiscordDetailsProps = z.infer<
  typeof zodUserDiscordDetailsSchema
>;

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

export type UserGithubDetailsProps = z.infer<
  typeof zodUserGithubDetailsSchema
> & {
  installId: number;
  accessToken: string;
};
export const userGithubDetailsKeys: string[] = [
  "accessToken",
  "installId",
  "refreshToken",
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
  username: string;
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

export type UserSearchInfoProps = z.infer<typeof zodUserSearchInfoSchema>;
// {
//   avatar?: string;
//   bio?: string;
//   skills: Array<(typeof skills)[number]>;
//   discordDetails: UserDiscordDetailsProps;
//   githubDetails?: UserGithubDetailsProps;
//   skillLevel?: MemberLevelType;
//   username?: string;
//   _id: mongoose.Types.ObjectId;
// };
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

export type UserMongoProps = UserProps;
//  Omit<UserProps, "githubId">;

export type ContactDetailsProps =
  | null
  | undefined
  | {
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
  ids = "userIds",
  installId = "userGHInstallId",
  repos = "userRepos",
  accessToken = "userGHAccessToken",
}
export type UserFormProps = z.infer<typeof zodUserFormSchema>;
export type LookingForMembersProps = {
  username: string;
  _id?: Types.ObjectId;
  level?: MemberLevelType;
  type?: "projects" | "users";
};
