import { MongoDBAdapter } from "@auth/mongodb-adapter";
import getClientPromise from "../mongodb.config";
import { Adapter } from "next-auth/adapters";

let adapter: Adapter;

try {
  const client = getClientPromise();
  adapter = MongoDBAdapter(client) as Adapter;
} catch (error) {
  console.error("Failed to create MongoDB adapter:", error);
  // Provide a fallback or throw an error based on your requirements
}

export { adapter };
