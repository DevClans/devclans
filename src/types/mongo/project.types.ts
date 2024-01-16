import mongoose, { Document } from "mongoose";
import { UserProps } from "./user.types";

export interface ProjectProps extends Document {
  title: string;
  desc: string;
  owner: mongoose.Types.ObjectId | UserProps;
  contributors: mongoose.Types.ObjectId[] | UserProps[];
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
  team: mongoose.Types.ObjectId[] | UserProps[];
  needMembers: "professional" | "student" | "beginner" | null;
  imgs: string[];
  video: string;
  devStage: "idea" | "development" | "alpha" | "beta" | "production";
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
