import { urlApi } from "@/constants";
import { Method } from "axios";
type CommonRequestHeadersList =
  | "Accept"
  | "Content-Length"
  | "User-Agent"
  | "cache-control"
  | "Content-Encoding"
  | "Authorization"
  | "Content-Type"
  | "d-a";

type ContentType =
  | "text/html"
  | "text/plain"
  | "multipart/form-data"
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "application/octet-stream";

type FetchProps = {
  endpoint: string;
  redirect?: "follow" | "error" | "manual";
  method?: Method;
  baseUrl?: string;
  headers?: any;
  type?: "nan" | "an"; //nan means no access needed and an means access needed
  token?: string;
  body?: any;
  revalidate?: false | number;
  cache?: "no-store" | "no-cache";
  needError?: boolean;
};

export const Fetch = async ({
  endpoint,
  headers,
  baseUrl = urlApi,
  method = "GET",
  token,
  type = "nan",
  body,
  revalidate = false,
  cache,
  needError = false,
  redirect = "follow",
}: FetchProps) => {
  const options: Partial<FetchProps> = {
    method,
    redirect,
    headers: {
      // "cache-control": "no-store",
      "Content-Type": "application/json",
      "x-d-a": type, // d-a means devclans-access
    },
  };
  if (typeof revalidate == "number") {
    (options as any)["next"] = { revalidate };
  }
  if (cache) {
    options["cache"] = cache;
  }
  if (token) {
    options["headers"]["Authorization"] = `Bearer ${token}`;
  }
  if (headers) {
    Object.assign(options["headers"], headers);
  }
  if (body) {
    options["body"] = JSON.stringify(body);
  }
  try {
    // console.log("options", options);
    const res = await fetch((baseUrl || urlApi) + (endpoint || ""), options);
    if (res.status > 200) {
      if (!needError) {
        throw new Error(res.statusText);
      }
      return await res.json();
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in Fetch");
    return [];
  }
};
