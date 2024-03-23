import { UserGithubDetailsProps } from "@/types/mongo/user.types";
import { Schema } from "mongoose";

export const userGithubDetailsSchema = new Schema<UserGithubDetailsProps>(
  {
    accessToken: {
      type: String,
      // required: function (this: any) {
      //   return !this.installId;
      // },
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z0-9]+$/.test(value); // Example: Only alphanumeric characters allowed
        },
        message: (props: any) => `${props.value} is not a valid accessToken!`,
      },
    },
    installId: {
      type: String,
      unique: true,
    },
    avatar_url: { type: String },
    node_id: { type: String },
    name: { type: String, trim: true, maxlength: 255 },
    company: { type: String, trim: true, maxlength: 255 },
    bio: { type: String, trim: true, maxlength: 500 },
    twitter_username: {
      type: String,
      trim: true,
      maxlength: 50,
      validate: {
        validator: function (value: string) {
          return /^[A-Za-z0-9_]+$/.test(value); // Example: Only alphanumeric characters and underscores allowed
        },
        message: (props: any) =>
          `${props.value} is not a valid twitter_username!`,
      },
    },
    login: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    readme: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
  },
  { timestamps: true }
);
