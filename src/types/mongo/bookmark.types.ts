import mongoose, { Document } from "mongoose";
import { UserProps } from "./user.types";
import { ProjectProps } from "./project.types";

export interface BookmarkProps extends Document {
  user: mongoose.Types.ObjectId | UserProps;
  project: mongoose.Types.ObjectId | ProjectProps;
  timestamp: Date;
}
