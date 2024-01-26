import mongoose from "mongoose";
import { UserProps, UserTeamProps } from "./user.types";
import { DevStagesType } from "@/lib/devStages";
import { MemberLevelType } from "@/lib/memberLevel";
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
  _id?: mongoose.Types.ObjectId;
  title: string;
  desc: string;
  owner: mongoose.Types.ObjectId | Partial<UserProps>;
  contributors: mongoose.Types.ObjectId[] | Partial<UserProps>[];
  topics: string[];
  techStack: string[];
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
  repoDetails: Partial<ProjectRepoDetailsProps>;
};

export type ProjectRepoDetailsProps = ProjectFilesProps & {
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
  techStack: string[];
  team: mongoose.Types.ObjectId[];
};

export const projectSearchItemKeys: string[] = [
  "needMembers",
  "imgs",
  "_id",
  "desc",
  "title",
  "techStack",
  "team",
];
