import { z } from "zod";
import mongoose from "mongoose";

export const zodMongoId = z.string().refine((val) => {
  return mongoose.Types.ObjectId.isValid(val);
});
