import { contactMethodsMap } from "@/lib/contactMethods";
import { skills } from "@/lib/skills";
import mongoose, { Document } from "mongoose";

// Define the User interface extending mongoose.Document
export interface UserProps extends Document {
  discordId: string;
  githubId: string;
  username?: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  email?: string;
  contactMethod: "discord" | "email" | "whatsapp" | "telegram" | "twitter";
  socials: {
    twitter: string;
    telegram: string;
    linkedin: string;
    website: string;
  };
  skills: Array<(typeof skills)[number]>;
  ownedProjects: mongoose.Types.ObjectId[];
  contributedProjects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export type ContactDetailsProps = {
  name: string;
  contactId: string;
  contactMethod: keyof typeof contactMethodsMap;
  icon?: any;
};
