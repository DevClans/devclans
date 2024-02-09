import { ObjectId, Types } from "mongoose";

export const urlBase =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const urlApi = urlBase + "/api";
export const urlDb =
  process.env.MONGO_URL || "mongodb://localhost:27017/devclans";
export const urlGithub = (username: string) => `https://github.com/${username}`;
export const urlUser = (id?: Types.ObjectId | string) =>
  urlBase + `/user${id ? "/" + id : ""}`;
export const urlProject = (id?: Types.ObjectId | string) =>
  urlBase + `/project${id ? "/" + id : ""}`;
export const fallbackImg = "/produtImgFallback.png";
export const fallbackImgUser = "/userImgFallback.png";
