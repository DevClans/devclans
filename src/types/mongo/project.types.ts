import mongoose, { Document } from "mongoose";
import { UserProps } from "./user.types";

export type ProjectProps = {
  title: string;
  desc: string;
  owner: mongoose.Types.ObjectId | Partial<UserProps>;
  contributors: mongoose.Types.ObjectId[] | Partial<UserProps>[];
  topics: string[];
  techStack: string[];
  githubLink: string;
  likesCount: number;
  bookmarkCount: number;
  projectLinks: string[];
  projectDetails: {
    problem: string;
    challenges: {
      title: string;
      desc: string;
      solution: string;
    }[];
    futureGoals: {
      title: string;
      desc: string;
      needHelp: boolean;
    }[];
    memberReq: {
      title: string;
      desc: string;
    }[];
  };
  team: mongoose.Types.ObjectId[] | Partial<UserProps>[];
  needMembers: "professional" | "student" | "beginner" | null;
  imgs: string[];
  video: string;
  devStage: "idea" | "development" | "alpha" | "beta" | "production";
  updatedAt: Date;
  published: boolean;
  createdAt: Date;
};

export type ProjectInputProps = {
  title: string;
  desc: string;
  topics: string[];
  githubLink: string;
  techStack: string[];
  projectLinks: string[];
  projectDetails: {
    problem: string;
    challenges: {
      title: string;
      desc: string;
      solution: string;
    }[];
    futureGoals: {
      title: string;
      desc: string;
      needHelp: boolean;
    }[];
    memberReq: {
      title: string;
      desc: string;
    }[];
  };
  team: mongoose.Types.ObjectId[] | UserProps[];
  needMembers: "professional" | "student" | "beginner" | null;
  imgs: string[];
  video: string;
  devStage: "idea" | "development" | "alpha" | "beta" | "production";
  published: boolean;
};

export type ProjectFilesProps = {
  readme: string;
  contributing: string;
};
