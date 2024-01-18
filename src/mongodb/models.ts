import { UserMongoProps, UserProps } from "../types/mongo/user.types";
import { LikeProps } from "../types/mongo/like.types";
import { skills } from "@/lib/skills";
import { BookmarkProps } from "@/types/mongo/bookmark.types";
import { ProjectProps } from "@/types/mongo/project.types";
import mongoose from "mongoose";
import { contactMethods } from "@/lib/contactMethods";
import { devStages } from "@/lib/devStages";
import { memberLevels } from "@/lib/memberLevel";

const userSchema = new mongoose.Schema<UserMongoProps>(
  {
    discordId: { type: String, required: true },
    githubAccessToken: { type: String, required: true },
    username: { type: String },
    avatar: { type: String },
    bio: { type: String, maxlength: 180 }, // describe yourself to cohort folks
    phone: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^[0-9]{10}$/.test(value);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
      required: function () {
        return (this as any).contactMethod === "whatsapp";
      },
    },
    email: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
      required: function () {
        return (this as any).contactMethod === "email";
      },
    },
    contactMethod: {
      type: String,
      enum: contactMethods,
      default: "discord",
    },
    socials: {
      twitter: {
        type: String,
        required: function () {
          return (this as any).contactMethod === "twitter";
        },
        default: "",
      },
      telegram: {
        type: String,
        required: function () {
          return (this as any).contactMethod === "telegram";
        },
        default: "",
      },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    skills: [
      {
        type: String,
        enum: skills, // Assuming skills is defined somewhere
      },
    ],
    ownedProjects: [
      { type: mongoose.Types.ObjectId, ref: "Project", default: [] },
    ],
    contributedProjects: [
      { type: mongoose.Types.ObjectId, ref: "Project", default: [] },
    ],
    currentCompany: { type: String },
    careerGoal: { type: String, enum: ["remote", "faang", "startup"] },
    proudAchievement: { type: String },
    recentWork: { type: String },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema<LikeProps>(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
    // timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const bookmarkSchema = new mongoose.Schema<BookmarkProps>(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
    // timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema<ProjectProps>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    contributors: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    topics: [{ type: String, default: [] }], // ml, android
    techStack: [{ type: String, default: [] }], // tech: html, css
    repoName: { type: String, default: "" },
    likesCount: { type: Number, default: 0 },
    bookmarkCount: { type: Number, default: 0 },
    projectLinks: [{ type: String, default: [] }],
    projectDetails: {
      problem: { type: String, required: true },
      challenges: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          solution: { type: String, default: "" },
          default: [],
        },
      ],
      futureGoals: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
          needHelp: { type: Boolean, default: false },
          default: [],
        },
      ],
      memberReq: [
        {
          title: { type: String, default: "" },
          desc: { type: String, default: "" },
        },
      ],
    },
    team: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    needMembers: {
      type: String,
      enum: memberLevels,
      default: null,
    },
    imgs: [{ type: String, default: [] }],
    video: { type: String, default: "" },
    devStage: {
      type: String,
      enum: devStages,
      default: "idea",
    },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
const ProjectModel =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
const LikeModel = mongoose.models.Like || mongoose.model("Like", likeSchema);
const BookmarkModel =
  mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);

export { UserModel, ProjectModel, LikeModel, BookmarkModel };
