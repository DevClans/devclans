import { UserMongoProps } from "../types/mongo/user.types";
import { LikeProps } from "../types/mongo/like.types";
import { skills } from "@/lib/skills";
import { BookmarkProps } from "@/types/mongo/bookmark.types";
import { ProjectProps } from "@/types/mongo/project.types";
import mongoose from "mongoose";
import { contactMethods } from "@/lib/contactMethods";
import { devStages } from "@/lib/devStages";
import { memberLevels } from "@/lib/memberLevel";
import { discordDetailsSchema } from "./discordModel";
import { userGithubDetailsSchema } from "./githubModal";
import projectRepoSchema from "./projectRepoDetails";
import { projectDomains } from "@/lib/domains";

const userSchema = new mongoose.Schema<UserMongoProps>(
  {
    discordId: { type: String, required: true },
    skillLevel: { type: String, enum: memberLevels, default: "beginner" },
    githubId: { type: String },
    githubDetails: {
      type: userGithubDetailsSchema,
    },
    domain: {
      type: String,
      enum: projectDomains,
    },
    username: { type: String, unique: true },
    avatar: { type: String },
    bio: { type: String, maxlength: 180 },
    phone: {
      type: String,
      validate: {
        validator: function (value: string) {
          return /^[0-9]{10}$/.test(value);
        },
        message: (props: any) => `${props.value} is not a valid phone number!`,
      },
      required: function (this: any) {
        return this.contactMethod === "whatsapp";
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
      required: function (this: any) {
        return this.contactMethod === "email";
      },
    },
    contactMethod: {
      type: String,
      default: "discord",
      enum: contactMethods,
    },
    socials: {
      twitter: {
        type: String,
        required: function (this: any) {
          return this.contactMethod === "twitter";
        },
        default: "",
      },
      telegram: {
        type: String,
        required: function (this: any) {
          return this.contactMethod === "telegram";
        },
        default: "",
      },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    skills: [
      {
        type: String,
        enum: skills,
      },
    ],
    ownedProjects: [
      { type: mongoose.Types.ObjectId, ref: "Project", default: [] },
    ],
    contributedProjects: [
      { type: mongoose.Types.ObjectId, ref: "Project", default: [] },
    ],
    questions: {
      currentCompany: { type: String },
      careerGoal: [{ type: String, enum: ["remote", "faang", "startup"] }],
      proudAchievement: { type: String },
      recentWork: { type: String },
    },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
    discordDetails: { type: discordDetailsSchema },
    isMember: { type: Boolean, default: false },
    repos: [
      {
        type: String,
      },
    ],
    resume: { type: String, default: "" },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema<LikeProps>({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
  timestamp: { type: Date, default: Date.now },
});

const bookmarkSchema = new mongoose.Schema<BookmarkProps>({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Types.ObjectId, ref: "Project", required: true },
  timestamp: { type: Date, default: Date.now },
  // // targt and targetType in case we want to bookmark both users and projects
  // target: {
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   refPath: 'targetType',
  // },
  // targetType: { type: String, enum: ['User', 'Project'], required: true },
  // timestamp: { type: Date, default: Date.now },
});

const projectSchema = new mongoose.Schema<ProjectProps>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    //owner:{ type: String, required:true },
    contributors: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    //contributors:[{ type:String, default:[]}],
    topics: [{ type: String, default: [] }], // ml, android
    skills: [{ type: String, default: [] }], // tech: html, css
    repoName: { type: String, default: "", unique: true },
    teamCode: { type: String, required: true, unique: true },
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
    skillLevel: {
      type: String,
      enum: memberLevels,
    },
    imgs: [{ type: String, default: [] }],
    video: { type: String, default: "" },
    devStage: {
      type: String,
      enum: devStages,
      default: "idea",
    },
    published: { type: Boolean, default: false },
    repoDetails: projectRepoSchema,
    domain: [{ type: String, enum: projectDomains }],
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
