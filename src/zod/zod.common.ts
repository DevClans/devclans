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
export const zodDateString = z.string().refine(
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

const ownedProjects = z.array(zodMongoId);

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

export const zodUserFormSchema = z
  .object({
    githubDetails: userGithubDetailsSchema.optional(),
    bio: stringSchema.min(10).max(100),
    contactMethod: z.enum(contactMethods as any),
    skills: z.array(z.enum(skills)).optional(),
    socials: z.object({
      twitter: stringSchema.max(150).optional(),
      telegram: stringSchema.max(150).optional(),
      linkedin: stringSchema.max(150).optional(),
      website: stringSchema.max(150).optional(),
    }),
    phone: z
      .string()
      .max(13)
      .nullable()
      .refine((value) => (value ? /^[0-9]{10}$/.test(value) : true), {
        message: "Invalid phone number!",
      })
      .optional(),
    email: z
      .string()
      .email()
      .min(10)
      .max(100)
      .nullable()
      .refine((value) => (value ? /\S+@\S+\.\S+/.test(value) : true), {
        message: "Invalid email address!",
      })
      .optional(),
    questions: z.object({
      currentCompany: z.string().max(250).optional(),
      careerGoal: z.enum(["remote", "faang", "startup"]).default("remote"),
      proudAchievement: z.string().max(250).optional(),
      recentWork: z.string().max(250).optional(),
    }),
    domain: z.enum(projectDomains),
  })
  .superRefine((value, context) => {
    if (value.contactMethod === "whatsapp" && !value.phone) {
      context.addIssue({
        code: "custom",
        message: "Phone number is required for WhatsApp contact method",
        path: ["phone"],
      });
    }
    if (value.contactMethod === "telegram" && !value.socials.telegram) {
      context.addIssue({
        code: "custom",
        message: "Telegram username is required for Telegram contact method",
        path: ["socials", "telegram"],
      });
    }
    if (value.contactMethod === "email" && !value.email) {
      context.addIssue({
        code: "custom",
        message: "Email is required for Email contact method",
        path: ["email"],
      });
    }
    if (value.contactMethod === "twitter" && !value.socials.twitter) {
      context.addIssue({
        code: "custom",
        message: "Twitter username is required for Twitter contact method",
        path: ["socials", "twitter"],
      });
    }
    // return true;
  });

export const userFormShape = zodUserFormSchema._def.schema.shape;

export const userSchema = z.object({
  ...userFormShape,
  discordId: z.string().min(5).max(50),
  username: stringSchema.max(50).min(1),
  avatar: z.string().optional(),
  ownedProjects: z.array(ownedProjects),
  contributedProjects: z.array(ownedProjects),
  discordDetails: discordDetailsSchema.optional(),
  createdAt: zodDateString,
  updatedAt: zodDateString,
});
export const userArraySchema = z.array(userSchema);

export const zodProjectSearchInfoSchema = z.object({
  _id: zodMongoId,
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
  owner: ownerSchema,
  contributors: z.string().array(),
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
  createdAt: zodDateString,
  updatedAt: zodDateString,
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
