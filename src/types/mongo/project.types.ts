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

export type ProjectRepoDetailsProps = {
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  topics: string[];
  createdAt: Date;
  updatedAt: Date;
  commits: number;
  lastCommit: Date;
};
export type ProjectTeamProps =
  | UserTeamProps
  | {
      team: mongoose.Types.ObjectId[];
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
