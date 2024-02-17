import { Types } from "mongoose";

export const isDev = process.env.NODE_ENV === "development";
export const urlBase =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const urlApi = urlBase + "/api";
export const urlDb =
  process.env.MONGO_URL || "mongodb://localhost:27017/devclans";
export const urlGithub = (username: string) => `https://github.com/${username}`;
export const urlGithubRepo = ({
  repoName,
  username,
  repo,
}:
  | { username?: string; repo?: string; repoName: string }
  | { username: string; repo: string; repoName?: string }) =>
  (repoName || (username && repo)) &&
  `https://github.com/${repoName || username + "/" + repo}`;
export const urlUser = ({
  id,
  username,
  onlyEndpoint = false,
}: {
  id?: Types.ObjectId | string;
  username: string;
  onlyEndpoint?: boolean;
}) => {
  const endpoint =
    username || id
      ? `/user${username ? "/" + username : id ? "/" + id : ""}`
      : "";
  if (onlyEndpoint) {
    return endpoint;
  }
  return urlBase + endpoint;
};
export const urlProject = (id?: Types.ObjectId | string) =>
  urlBase + (id ? `/project${id ? "/" + id : ""}` : "");
export const fallbackImg = "/produtImgFallback.png";
export const fallbackImgUser = "/userImgFallback.png";
