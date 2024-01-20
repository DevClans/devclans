import { UserDiscordDetailsProps } from "@/types/mongo/user.types";
import mongoose, { Schema } from "mongoose";

export const discordDetailsSchema: Schema<UserDiscordDetailsProps> =
  new mongoose.Schema({
    _id: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => /^\d{17,19}$/.test(value), // Discord ID validation
        message: (props: { value: string }) =>
          `${props.value} is not a valid Discord ID!`,
      },
    },
    username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 32,
    },
    discriminator: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => /^\d{4}$/.test(value), // 4-digit discriminator validation
        message: (props: { value: string }) =>
          `${props.value} is not a valid discriminator!`,
      },
    },
    avatar: {
      type: String,
      default: "",
      validate: {
        validator: (value: string) =>
          /^https:\/\/cdn.discordapp.com/.test(value), // Example: Check if it's a valid URL
        message: (props: { value: string }) =>
          `${props.value} is not a valid avatar URL!`,
      },
    },
    accent_color: {
      type: String,
      default: "",
      validate: {
        validator: (value: string) => /^#([0-9a-fA-F]{3}){1,2}$/.test(value), // Example: Check if it's a valid hex color code
        message: (props: { value: string }) =>
          `${props.value} is not a valid accent color!`,
      },
    },
    bot: {
      type: Boolean,
      default: false,
    },
    global_name: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
      validate: {
        validator: (value: string) =>
          /^https:\/\/cdn.discordapp.com/.test(value), // Example: Check if it's a valid URL
        message: (props: { value: string }) =>
          `${props.value} is not a valid banner URL!`,
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: "",
      validate: {
        validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // Example: Check if it's a valid email address
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address!`,
      },
    },
    // Add other properties and validations as needed
  });

const DiscordDetails =
  mongoose.models.DiscordDetails ||
  mongoose.model<UserDiscordDetailsProps>(
    "DiscordDetails",
    discordDetailsSchema
  );

export default DiscordDetails;
