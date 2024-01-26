import { contactMethods } from "@/lib/contactMethods";
import { z } from "zod";
import { Types } from "mongoose";
export const zodUserTeamItemSchema = z.object({
  githubId: z.string(),
  discordId: z.string().regex(/^\d{17,19}$/), // Ensure it's a valid Discord ID
  username: z.string().optional(),
  avatar: z.string().url().optional(), // Ensure it's a valid URL if present
  _id: z.string().refine((value) => Types.ObjectId.isValid(value), {
    message: "something woroong with object id",
  }),
  contactMethod: z.enum(contactMethods).default("discord"), // Replace with the actual contact methods
  contactMethodId: z.string().optional(),
});
