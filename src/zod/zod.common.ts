import { z } from "zod";
import { skills } from "@/lib/skills";
import { Types, Schema } from 'mongoose';



const ownerSchema =  z.custom<Schema.Types.ObjectId>((value: any) => {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ObjectId');
  }
  return new Types.ObjectId(value);
});



const ownedProjects =  z.custom<Schema.Types.ObjectId>((value: any) => {
  if (!Types.ObjectId.isValid(value)) {
    throw new Error('Invalid ObjectId');
  }
  return new Types.ObjectId(value);
});



const domain =  ["frontend", "backend", "fullstack", "designer", "other"] as const;
const contact = [ 'discord', 'whatsapp', 'telegram', 'twitter' ] as const;
const memberLevels = ['beginner','intermediate','advanced','expert','master','grandmaster','legend','god'] as const;
const devStages = [ 'idea', 'development', 'alpha', 'beta', 'production' ] as const;
export const stringSchema = z.string();

export const stringArraySchema = z.array(z.string());

export const userGithubDetailsSchema = z.object({
  accessToken: z.string(),
  username: z.string().max(50),
  avatar_url: z.string().optional(),
  node_id: z.string().optional(),
  name: z.string().trim().max(255).optional(),
  company: z.string().trim().max(255).optional(),
  bio: z.string().trim().max(500).optional(),
  twitter_username: z.string().trim().max(50).optional(),
  login: z.string().min(1).trim(),
});

export const discordDetailsSchema = z.object({
  _id: z.string().refine((value) => /^\d{17,19}$/.test(value), {
    message: "Invalid Discord ID! Must be a string of 17 to 19 digits.",
  }),
  username: z.string().min(2).max(32),
  discriminator: z.string().refine((value) => /^\d{4}$/.test(value), {
    message: "Invalid discriminator! Must be a string of 4 digits.",
  }),
  avatar: z.string().default("").refine((value) => /^https:\/\/cdn.discordapp.com/.test(value), {
    message: "Invalid avatar URL! Must start with 'https://cdn.discordapp.com/'.",
  }),
  accent_color: z.string().default("").refine((value) => /^#([0-9a-fA-F]{3}){1,2}$/.test(value), {
    message: "Invalid accent color! Must be a valid hex color code.",
  }),
  bot: z.boolean().default(false),
  global_name: z.string().default(""),
  banner: z.string().default("").refine((value) => /^https:\/\/cdn.discordapp.com/.test(value), {
    message: "Invalid banner URL! Must start with 'https://cdn.discordapp.com/'.",
  }),
  verified: z.boolean().default(false),
  email: z.string().default("").refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
    message: "Invalid email address!",
  }),
  // Add other properties and validations as needed
});


export const userSchema = z.object({
  discordId:stringSchema.max(50).min(1),
  githubDetails:userGithubDetailsSchema.optional(),
  domain: z.enum(domain).optional(),
  username:stringSchema.max(50).min(1),
  avatar: z.string().optional(),
  bio:stringSchema.max(100).optional(),
  contactMethod:z.enum(contact).default("discord"),
  socials: z.object({
    twitter:stringSchema.optional(),
    telegram:stringSchema.optional(),
    linkedin:stringSchema.default(""),
    website:stringSchema.default("")
  }),
  phone: z.string().refine((value) => /^[0-9]{10}$/.test(value), {
    message: "Invalid phone number!",
  }).optional(),
  email: z.string().refine((value) => /\S+@\S+\.\S+/.test(value), {
    message: "Invalid email address!",
  }).optional(),

  skills: z.array(z.enum(skills)).optional(),
  ownedProjects: z.array(ownedProjects),
  contributedProjects: z.array(ownedProjects),
  questions: z.object({
    currentCompany: z.string().optional(),
    careerGoal: z.enum(["remote", "faang", "startup"]).optional(),
    proudAchievement: z.string().optional(),
    recentWork: z.string().optional(),
  }).optional(),
  discordDetails:discordDetailsSchema.optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  
})
export const userArraySchema= z.array(userSchema)


export const projectSchema = z.object({
  title: z.string().min(1).max(50),
  desc: z.string().min(1).max(180),
  owner:ownerSchema,
  contributors:z.array(ownerSchema),
  // Add other properties if needed
  topics: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  repoName: z.string().max(50).default(""),
  likesCount: z.number().default(0),
  bookmarkCount: z.number().default(0),
  projectLinks: z.array(z.string()).default([]),
  projectDetails: z.object({
    problem: z.string().max(180),
    challenges: z.array(z.object({
      title: z.string().default(""),
      desc: z.string().default(""),
      solution: z.string().default(""),
    })).default([]),
    futureGoals: z.array(z.object({
      title: z.string().default(""),
      desc: z.string().default(""),
      needHelp: z.boolean().default(false),
    })).default([]),
    memberReq: z.array(z.object({
      title: z.string().default(""),
      desc: z.string().default(""),
    })).default([]),
  }),
  team: z.array(z.string()).default([]),
  needMembers: z.enum(memberLevels).nullable().default("beginner"),
  imgs: z.array(z.string()).default([]),
  video: z.string().default(""),
  devStage: z.enum(devStages).default("idea"),
  published: z.boolean().default(false),
  repoDetails: z.object({
    description: z.string().default(""),
    stars: z.number().default(0),
    forks: z.number().default(0),
    watchers: z.number().default(0),
    topics: z.array(z.string()).default([]),
    commits: z.number().default(0),
    lastCommit: z.date().default(() => new Date()),
  }),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const projectArraySchema = z.array(projectSchema);

export const likeSchema = z.object(
  {
    user:ownerSchema,
    project:ownedProjects
  }
)
