import { zodProjectOwnerSchema } from "./../../zod/zod.common";
import { ProjectDomainType } from "./../../lib/domains";
import mongoose, { Types } from "mongoose";
import {
  ContactDetailsProps,
  LookingForMembersProps,
  UserProps,
  UserTeamProps,
} from "./user.types";
import { DevStagesType } from "@/lib/devStages";
import { MemberLevelType } from "@/lib/memberLevel";
import { zodProjectFormSchema } from "@/zod/zod.common";
import { z } from "zod";
export type FetchProjectDetailsItemProps = {
  title: string;
  desc: string;
  solution?: string;
  needHelp?: boolean;
}[];
export type FetchProjectDetailsProps = {
  problem: string;
  challenges: Omit<FetchProjectDetailsItemProps, "needHelp">;
  futureGoals: Omit<FetchProjectDetailsItemProps, "solution">;
  memberReq: Omit<FetchProjectDetailsItemProps, "solution" | "needHelp">;
};
export type ProjectProps = ProjectTeamProps & {
  _id: mongoose.Types.ObjectId;
  title: string;
  desc: string;
  domain: ProjectDomainType;
  owner: mongoose.Types.ObjectId | Partial<UserProps>;
  contributors: mongoose.Types.ObjectId[] | Partial<UserProps>[];
  topics: string[];
  skills: string[];
  repoName: string;
  likesCount: number;
  bookmarkCount: number;
  projectLinks: string[];
  projectDetails: FetchProjectDetailsProps;
  needMembers: MemberLevelType;
  imgs: string[];
  video: string;
  devStage: DevStagesType;
  updatedAt: Date;
  published: boolean;
  createdAt: Date;
  repoDetails: Partial<ProjectRepoDetailsMongoProps>;
};
export type ProjectRepoDetailsProps = {
  description: string;
  owner: string;
  watchers_count: number;
  forks: number;
  watchers: number;
  topics: string[];
  created_at: Date;
  updated_at: Date;
  commits: number;
  lastCommit: Date;
  languages: {
    name: string;
    color: string;
    percentage: number;
  }[];
};

export type ProjectRepoDetailsMongoProps = ProjectFilesProps &
  Omit<ProjectRepoDetailsProps, "languages"> & {
    languages: Record<string, number>;
  };

export const ProjectRepoDetailsKeys: string[] = [
  "description",
  "owner",
  "watchers_count",
  "forks",
  "watchers",
  "topics",
  "created_at",
  "updated_at",
  "commits",
  "lastCommit",
  "languages",
];
export type ProjectTeamProps = (
  | UserTeamProps
  | {
      team: mongoose.Types.ObjectId[];
    }
) & {
  helpedIn:
    | "idea"
    | "development"
    | "testing"
    | "design"
    | "documentation"
    | "frontend"
    | "backend"
    | "fullstack"
    | "other";
};

export type ProjectInputProps = Omit<
  ProjectProps,
  | "_id"
  | "owner"
  | "contributors"
  | "likesCount"
  | "bookmarkCount"
  | "updatedAt"
  | "createdAt"
>;

export type ProjectFilesProps = {
  readme: string;
  contributing: string;
};

export enum ProjectRedisKeys {
  list = "projects",
  data = "projectData",
  github = "projectGithub",
  discord = "projectDiscord",
  search = "projectSearches",
}

export type ProjectSearchItemProps = {
  needMembers?: MemberLevelType;
  imgs: string[];
  _id?: mongoose.Types.ObjectId;
  desc: string;
  title: string;
  skills: string[];
  owner: Types.ObjectId | z.infer<typeof zodProjectOwnerSchema>;
  team: {
    username?: string;
    _id: mongoose.Types.ObjectId;
  }[];
};

export const projectSearchItemKeys: string[] = [
  "needMembers",
  "imgs",
  "_id",
  "desc",
  "owner",
  "title",
  "skills",
  "team",
];

export type ProjectFormProps = z.infer<typeof zodProjectFormSchema>;

export type UserSidebarProps = UserTeamProps & {
  links: ProjectProps["projectLinks"];
  needMembers: LookingForMembersProps;
  contact: ContactDetailsProps[];
};
