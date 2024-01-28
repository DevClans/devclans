import { z } from "zod";
import { skills } from "@/lib/skills";
import { Types, Schema } from "mongoose";
import { memberLevels } from "@/lib/memberLevel";
import { devStages } from "@/lib/devStages";
import { contactMethods } from "@/lib/contactMethods";
import { projectDomains } from "@/lib/domains";
import { zodUserTeamItemSchema } from "./users/zod.userTeam";

export const zodMongoId = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "something worong with object id",
  });
 export const MySchema = z.object({
    owner: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid ObjectId',
    }),
  });
export const zodDateString = z.date().refine(
  (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  },
  {
    message: "Invalid date string",
    path: [], // path is filled out by zod
  }
);
export const zodGithubAccessToken = z
  .string()
  .refine((value) => /^[a-fA-F0-9]{40}$/.test(value), {
    message: "Invalid GitHub access token format",
  });
const ownerSchema = z.object({
  _id: zodMongoId,
  githubId: z.string().min(1).max(50),
  githubDetails: z
    .object({
      accessToken: zodGithubAccessToken,
    })
    .optional(),
});

export const stringSchema = z.string();


const ownedProjects = z.array(z.object({
  _id:stringSchema}));


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
  avatar: z
    .string()
    .default("")
    .refine((value) => /^https:\/\/cdn.discordapp.com/.test(value), {
      message:
        "Invalid avatar URL! Must start with 'https://cdn.discordapp.com/'.",
    }),
  accent_color: z
    .string()
    .default("")
    .refine((value) => /^#([0-9a-fA-F]{3}){1,2}$/.test(value), {
      message: "Invalid accent color! Must be a valid hex color code.",
    }),
  bot: z.boolean().default(false),
  global_name: z.string().default(""),
  banner: z
    .string()
    .default("")
    .refine((value) => /^https:\/\/cdn.discordapp.com/.test(value), {
      message:
        "Invalid banner URL! Must start with 'https://cdn.discordapp.com/'.",
    }),
  verified: z.boolean().default(false),
  email: z
    .string()
    .default("")
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Invalid email address!",
    }),
  // Add other properties and validations as needed
});

export const profileSchema = z.object({
  githubDetails: userGithubDetailsSchema.optional(),
  bio: stringSchema.max(100).optional(),
  contactMethod: z.enum(contactMethods).default("discord"),
  skills: z.array(z.enum(skills)).optional(),
  socials: z.object({
    twitter: stringSchema.optional(),
    telegram: stringSchema.optional(),
    linkedin: stringSchema.default(""),
    website: stringSchema.default(""),
  }),
  phone: z
    .string()
    .refine((value) => /^[0-9]{10}$/.test(value), {
      message: "Invalid phone number!",
    })
    .optional(),
  email: z
    .string()
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Invalid email address!",
    })
    .optional(),

  
  ownedProjects: z.array(z.string()),
  contributedProjects: z.array(z.string()),
  questions: z
    .object({
      currentCompany: z.string().optional(),
      careerGoal: z.enum(["remote", "faang", "startup"]).optional(),
      proudAchievement: z.string().optional(),
      recentWork: z.string().optional(),
    })
    .optional(),
  domain: z.enum(projectDomains).optional(),
}).optional();


export const userSchema = z.object({
  // ...profileSchema.shape,
  discordId: z.string().min(5).max(50),
  username: stringSchema.max(50).min(1),
  avatar: z.string().optional(),
  ownedProjects: z.array(ownedProjects),
  contributedProjects: z.array(ownedProjects),
  discordDetails: discordDetailsSchema.optional(),
  createdAt: zodDateString.optional(),
  updatedAt: zodDateString.optional(),
});

export const userArraySchema = z.array(userSchema);

export const zodProjectSearchInfoSchema = z.object({

  title: z.string().min(3).max(50),
  desc: z.string().min(10).max(180),
  skills: z.array(z.string()).default([]),
  team: z.array(zodUserTeamItemSchema).default([]),
  needMembers: z
    .enum(memberLevels as any)
    .nullable()
    .default("beginner"),
  imgs: z.array(z.string()).default([]),
});
export const zodRepoDetailsSchema = z
  .object({
    description: z.string().min(10).max(100),
    stars: z.number().max(1000000),
    forks: z.number().max(10000),
    watchers: z.number().max(1000000),
    topics: z.array(z.string()).max(20).default([]).optional(),
    commits: z.number().max(10000).optional(),
    lastCommit: zodDateString,
    readme: z.string().max(3000),
    contributing: z.string().max(3000),
    languages: z.record(z.number()),
  })
  .optional();
export const zodProjectDataSchema = z.object({
  contributors: z.string().array().default([]),
  // Add other properties if needed
  topics: z.array(z.string()).default([]),
  repoName: z.string().max(50).default(""),
  likesCount: z.number().default(0),
  bookmarkCount: z.number().default(0),
  projectLinks: z.array(z.string()).default([]),
  projectDetails: z.object({
    problem: z.string().max(180),
    challenges: z
      .array(
        z.object({
          title: z.string().default(""),
          desc: z.string().default(""),
          solution: z.string().default(""),
        })
      )
      .default([]),
    futureGoals: z
      .array(
        z.object({
          title: z.string().default(""),
          desc: z.string().default(""),
          needHelp: z.boolean().default(false),
        })
      )
      .default([]),
    memberReq: z
      .array(
        z.object({
          title: z.string().default(""),
          desc: z.string().default(""),
        })
      )
      .default([]),
  }),
  video: z.string().default(""),
  devStage: z.enum(devStages as any).default("idea"),
  published: z.boolean().default(false),
  repoDetails: zodRepoDetailsSchema,
});

export const projectSchema = z.object({
  ...zodProjectSearchInfoSchema.shape,
  ...zodProjectDataSchema.shape,
});

export const projectArraySchema = z.array(projectSchema);

export const likeAndBkMarkSchema = z.object({
  user: zodMongoId,
  project: zodMongoId,
});

export const zodFilterQuery = z.object({
  search: z.string().optional().default(""),
  page: z
    .union([z.string(), z.number()])
    .transform((value) =>
      typeof value === "string" ? parseFloat(value) : value
    )
    .optional()
    .default(parseInt("1")),
  filters: z
    .union([z.record(z.string().array()), z.string()])
    .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
    .optional()
    .default({}),
  pageLength: z.number().optional().default(20),
});
