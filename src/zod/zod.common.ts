import { z } from "zod";
import { skills } from "@/lib/skills";
import { Types } from "mongoose";
import { memberLevels } from "@/lib/memberLevel";
import { devStages } from "@/lib/devStages";
import { contactMethods } from "@/lib/contactMethods";
import { projectDomains } from "@/lib/domains";

export const zodMongoId = z.union([
  z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "something worong with object id",
  }),
  z.instanceof(Types.ObjectId).transform((id) => id.toString()),
]);
export const skillsSchema = z.array(z.enum(skills)).max(20);
export const zodRepoName = z
  .string()
  .trim()
  .min(0) // Allow empty string
  .max(100)
  .refine(
    (item) => {
      // Check if the string is empty or starts with the given string
      if (
        item === "" ||
        item.startsWith("https://github.com") ||
        item.startsWith("https://www.github.com")
      ) {
        return true;
      }
      // Check if the string starts with "/"
      if (item.startsWith("/")) {
        const parts = item.substring(1).split("/");
        // Check if there are at least two parts after splitting by "/"
        if (parts.length >= 2) {
          return true;
        }
      }
      return false;
    },
    { message: "Invalid github repo link" }
  );

const zodRepoNameStored = z
  .string()
  .trim()
  .min(3)
  .max(100)
  .refine(
    (item) => {
      if (item.startsWith("/") && item.substring(1).split("/").length >= 2)
        return true;
      return false;
    },
    {
      message: "Invalid github reponame",
    }
  );
export const MySchema = z.object({
  owner: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  }),
});
export const zodDiscordUsername = z
  .string()
  .trim()
  .regex(/^[a-z0-9_.]{2,32}$/, { message: "Invalid Username" }); // Ensure it's a valid Discord username

export const zodTeamContactSchema = z.object({
  githubId: z.string().optional(),
  discordId: z.string().min(5).max(50), // Ensure it's a valid Discord ID
  username: zodDiscordUsername,
  avatar: z.string().url().optional(), // Ensure it's a valid URL if present
  _id: zodMongoId,
  contactMethod: z.enum(contactMethods).default("discord"), // Replace with the actual contact methods
  contactMethodId: z.string().optional(),
});
export const zodUserTeamItemSchema = z
  .array(z.union([zodMongoId, zodTeamContactSchema.partial()]))
  .max(10);

export const zodDateString = z.union([
  z.date(),
  z.string().refine(
    (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    },
    {
      message: "Invalid date string",
      path: [], // path is filled out by zod
    }
  ),
]);
export const zodGithubAccessToken = z
  .string()
  .min(30)
  .max(60)
  .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
    message: "Invalid GitHub access token format",
  });

export const zodProjectOwnerSchema = z.union([
  z.object({
    _id: zodMongoId,
    githubId: z.string().min(1).max(50).optional(),
    githubDetails: z
      .object({
        accessToken: zodGithubAccessToken,
        login: z.string().min(1).max(50),
      })
      .optional(),
  }),
  zodMongoId,
]);

export const stringSchema = z.string();

const ownedProjects = z
  .array(
    z.object({
      _id: stringSchema,
    })
  )
  .max(30);

export const stringArraySchema = z.array(z.string()).max(20);
// Define a custom refinement function to validate the hexadecimal color code with variable length
const isValidHexColorVariableLength = (value: any) => {
  if (!value) {
    return true;
  }
  const hexString = value.toString(16); // Convert integer to hexadecimal string
  return /^#?([0-9A-F]{6}|[0-9A-F]{7}|[0-9A-F]{8})$/i.test(hexString); // Regular expression to validate hexadecimal color code with variable length
};
export const zodUserGithubDetailsSchemaForFrontend = z.object({
  avatar_url: z.string().optional(),
  node_id: z.string().optional(),
  name: z.string().trim().max(255).nullable().optional(),
  company: z.string().trim().max(255).nullable().optional(),
  bio: z.string().trim().max(500).nullable().optional(),
  twitter_username: z.string().trim().max(50).nullable().optional(),
  login: z.string().min(1).trim(),
  readme: z.string().max(3000).nullable().optional(),
});

export const zodUserGithubDetailsSchema = z
  .object({
    accessToken: z.string(),
  })
  .merge(zodUserGithubDetailsSchemaForFrontend);

export const zodUserDiscordDetailsSchema = z.object({
  _id: z.string().refine((value) => /^\d{17,19}$/.test(value), {
    message: "Invalid Discord ID! Must be a string of 17 to 19 digits.",
  }),
  username: zodDiscordUsername,
  discriminator: z
    .string()
    .refine((value) => /^\d{4}$/.test(value) || value == "0", {
      message: "Invalid discriminator! Must be a string of 4 digits.",
    }),
  avatar: z.string().max(100).nullable(),
  accent_color: z
    .union([z.number(), z.string()])
    .nullable()
    .refine((value) => isValidHexColorVariableLength(value), {
      message: "Invalid hexadecimal color code with variable length",
    })
    .optional(),
  bot: z.boolean().optional(),
  global_name: z.string().nullable().default(""),
  banner: z.string().max(100).nullable().optional(),
  verified: z.boolean().optional(),
  email: z
    .string()
    .nullable()
    .refine(
      (value) => (value ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : value),
      {
        message: "Invalid email address!",
      }
    )
    .optional(),
  // Add other properties and validations as needed
});
export const zodUserSearchInfoSchema = z.object({
  skillLevel: z
    .enum(memberLevels as any)
    .nullable()
    .optional(),
  skills: skillsSchema,
  // githubDetails: userGithubDetailsSchema,
  githubId: z.string().max(50).optional(),
  bio: stringSchema.min(10).max(100),
  username: zodDiscordUsername,
  avatar: z.string().optional(),
  discordDetails: zodUserDiscordDetailsSchema,
  _id: z.any(),
});

export const zodUserDataCommonSchema = z.object({
  contactMethod: z.enum(contactMethods as any),
  contactMethodId: z.string().max(120).optional(),
  socials: z.object({
    twitter: z
      .string()
      .nullable()
      .refine(
        (value) =>
          value
            ? (value.startsWith("https://x.com/") ||
                value.startsWith("https://www.x.com/")) &&
              value.length < 150
            : true,
        {
          message: "Invalid Twitter URL! Must start with 'https://x.com/'.",
        }
      )
      .optional(),
    telegram: z.string().max(150).optional(),
    linkedin: z
      .string()
      .nullable()
      .refine(
        (value) =>
          value
            ? (value.startsWith("https://linkedin.com/in/") ||
                value.startsWith("https://www.linkedin.com/in/")) &&
              value.length < 150
            : true,
        {
          message: "Invalid URL!",
        }
      )
      .optional(),
    website: z
      .string()
      .nullable()
      .refine(
        (value) =>
          value ? value.startsWith("https://") && value.length < 150 : true,
        {
          message: "Invalid URL! Must start with 'https://'.",
        }
      )
      .optional(),
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
    careerGoal: z
      .array(z.enum(["remote", "faang", "startup"]))
      .min(1)
      .max(3),
    proudAchievement: z.string().max(250).optional(),
    recentWork: z.string().max(250).optional(),
  }),
  domain: z.enum(projectDomains),
});
export const zodUserDataSchema = z.object({
  discordId: z.string().min(5).max(50),
  ownedProjects: z.array(ownedProjects).max(30),
  contributedProjects: z.array(ownedProjects).max(30),
  createdAt: zodDateString,
  updatedAt: zodDateString,
  ...zodUserDataCommonSchema.shape,
});
export const zodUserFormSchemaObj = z.object({
  skillLevel: z
    .enum(memberLevels as any)
    .nullable()
    .optional(),
  skills: skillsSchema.min(3),
  bio: stringSchema.min(10).max(100),
  ...zodUserDataCommonSchema.shape,
});
export const zodUserFormSuperRefine = (value: any, context: any) => {
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
};
export const zodUserFormSchema = zodUserFormSchemaObj.superRefine(
  zodUserFormSuperRefine
);

export const userFormShape = zodUserFormSchema._def.schema.shape;

export const userSchema = z.object({
  ...userFormShape,
  ...zodUserSearchInfoSchema.shape,
});

export const zodProjectSearchInfoSchema = z.object({
  title: z.string().min(3).max(50),
  desc: z.string().min(10).max(180),
  skills: skillsSchema,
  team: zodTeamContactSchema.partial().array().optional(),
  skillLevel: z
    .enum(memberLevels as any)
    .nullable()
    .optional(),
  imgs: z.array(z.string()).max(5).default([]),
  _id: zodMongoId,
  owner: zodProjectOwnerSchema,
});
export const zodRepoDetailsSchema = z.object({
  description: z.string().min(10).max(100).nullable(),
  watchers_count: z.number().max(1000000),
  forks: z.number().max(10000),
  watchers: z.number().max(1000000),
  topics: z.array(z.string()).max(20).default([]).optional(),
  commits: z.number().max(10000).optional(),
  lastCommit: zodDateString,
  created_at: zodDateString.optional(),
  updated_at: zodDateString.optional(),
  readme: z.string().max(3000),
  contributing: z.string().max(3000).nullable().optional(),
  languages: z.record(z.number()),
});
const commonString = z.string().trim();
export const zodProjectDetailsSchema = z.object({
  problem: z.string().min(3).max(180),
  challenges: z
    .array(
      z.object({
        title: commonString.min(3).max(50),
        desc: commonString.min(3).max(200).nullable().optional(),
        solution: commonString.optional(),
      })
    )
    .max(5)
    .optional(),
  futureGoals: z
    .array(
      z.object({
        title: commonString.min(3).max(50),
        desc: commonString.min(3).max(200).nullable().optional(),
        needHelp: z.boolean().default(false),
      })
    )
    .max(5)
    .optional(),
  memberReq: z
    .array(
      z.object({
        title: commonString.min(3).max(50),
        desc: commonString.min(3).max(200).nullable().optional(),
      })
    )
    .max(5)
    .optional(),
});

const StringArrayParser = z
  .string()
  .refine(
    (data) => {
      return typeof data === "string";
    },
    { message: "Input must be a string" }
  )
  .transform((data) => data.split(","));
export const zodVideoSchema = z
  .string()
  .trim()
  .refine(
    (item) => {
      if (!item) {
        return true;
      }
      // possible youtube links
      // https://www.youtube.com/watch?v=KK7K08dAtR4
      // https://www.youtube.com/embed/KK7K08dAtR4
      // https://youtu.be/KK7K08dAtR4?si=PCAHGyHuNK_yf72S
      if (
        item &&
        (item.startsWith("https://www.youtube.com/") ||
          item.startsWith("https://youtu.be/") ||
          item.startsWith("https://youtube.com/") ||
          item.startsWith("https://www.loom.com/") ||
          item.startsWith("https://loom.com/"))
      ) {
        return true;
      }
      return false;
    },
    {
      message: "Invalid video link",
    }
  );

export const zodProjectDataSchema = z.object({
  contributors: z.array(zodMongoId).max(20).default([]),
  // Add other properties if needed
  topics: z.array(z.string()).max(10).default([]),
  repoName: zodRepoName,
  likesCount: z.number().default(0),
  bookmarkCount: z.number().default(0),
  projectLinks: stringArraySchema.default([]),
  projectDetails: zodProjectDetailsSchema,
  video: zodVideoSchema.nullable().optional(),
  devStage: z.enum(devStages as any).default("idea"),
  published: z.boolean().default(false),
  domain: z.array(z.enum(projectDomains)).max(10),
  // repoDetails: zodRepoDetailsSchema.optional(),
});
export const projectSchema = zodProjectDataSchema
  .merge(zodProjectSearchInfoSchema)
  .merge(zodRepoDetailsSchema);

export const zodGithubDataSchema = z.object({
  owner: projectSchema.shape["owner"],
  repoName: zodRepoName,
});
export const zodProjectFormSchema = z.object({
  title: z.string().trim().min(3).max(50),
  desc: z.string().min(10).max(180),
  skills: skillsSchema,
  team: zodUserTeamItemSchema.optional(),
  skillLevel: z
    .enum(memberLevels as any)
    .nullable()
    .optional(),
  imgs: z.array(z.string().max(100)).max(10).default([]), // https://utfs.io/f/a28b23bf-1255-424d-b95a-8475a50e3e1e-9fxaqt.png
  topics: z.array(z.string()).max(10).default([]),
  repoName: zodRepoName.nullable().optional().default(null),
  // .refine((item) => item.startsWith("https://github.com"), {
  //   message: "Invalid github url",
  // })
  // .transform((item) => item.split("https://github.com")[1]),
  projectLinks: z.array(z.string().trim()).max(10).default([]),
  video: zodVideoSchema.nullable().optional(),
  projectDetails: zodProjectDetailsSchema,
  devStage: z.enum(devStages as any).default("idea"),
  published: z.boolean().default(false),
  domain: z.array(z.enum(projectDomains)).max(10),
});

export const zodProjectFormSchemaServer = zodProjectFormSchema
  .omit({ repoName: true })
  .extend({
    repoName: zodRepoName
      .transform((item) => item?.split("https://github.com")[1])
      .nullable()
      .optional(),
  });
export const projectArraySchema = z.array(projectSchema).max(20);

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
    .union([z.record(z.string().array().max(30)), z.string()])
    .transform((val) => (typeof val === "string" ? JSON.parse(val) : val))
    .optional()
    .default({}),
  pageLength: z.number().optional().default(20),
});

export const zodContactForm = z.object({
  email: z.string().email().max(100).optional(),
  name: z.string().max(50).optional(),
  message: z.string().min(3).max(2000),
});
