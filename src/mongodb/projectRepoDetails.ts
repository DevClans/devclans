import { ProjectRepoDetailsMongoProps } from "@/types/mongo/project.types";
import { Schema } from "mongoose";

const projectRepoSchema = new Schema<ProjectRepoDetailsMongoProps>({
  description: { type: String, trim: true, maxlength: 255 },
  watchers_count: { type: Number, required: true, min: 0 },
  forks: { type: Number, required: true, min: 0 },
  owner: { type: String },
  watchers: { type: Number, required: true, min: 0 },
  topics: {
    type: [String],
    default: [],
    validate: [arrayMaxLengthValidator, "Topics array exceeds maximum length"],
  },
  lastCommit: { type: Date, required: true },
  readme: {
    type: String,
    validate: [textLengthValidator, "Readme text exceeds maximum length"],
  },
  contributing: {
    type: String,
    validate: [textLengthValidator, "Contributing text exceeds maximum length"],
  },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  languages: { type: Object },
});

// Custom validator for text length
function textLengthValidator(text: string) {
  return text.length <= 3000; // Adjust the maximum length as needed
}

// Custom validator for array length
function arrayMaxLengthValidator(arr: any[]) {
  return arr.length <= 20; // Adjust the maximum length as needed
}

export default projectRepoSchema;
