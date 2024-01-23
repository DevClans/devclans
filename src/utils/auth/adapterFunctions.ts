import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClient from "../mongodb.config";
import { Adapter } from "next-auth/adapters";

const adapter = MongoDBAdapter(mongoClient) as Adapter;

export { adapter };
