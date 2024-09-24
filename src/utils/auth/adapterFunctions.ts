import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../mongodb.config";
import { Adapter } from "next-auth/adapters";

let adapter: Adapter;

try {
  adapter = MongoDBAdapter(clientPromise) as Adapter;
} catch (error) {
  console.error("Failed to create MongoDB adapter:", error);
  // Provide a fallback or throw an error based on your requirements
  throw new Error("Failed to initialize authentication adapter");
}

export { adapter };
