import { urlApi } from "@/constants";
import { Method } from "axios";
type CommonRequestHeadersList =
  | "Accept"
  | "Content-Length"
  | "User-Agent"
  | "cache-control"
  | "Content-Encoding"
  | "Authorization";

type ContentType =
  | "text/html"
  | "text/plain"
  | "multipart/form-data"
  | "application/json"
  | "application/x-www-form-urlencoded"
  | "application/octet-stream";

type FetchProps = {
  endpoint: string;
  method?: Method;
  baseUrl?: string;
  headers?: Record<CommonRequestHeadersList, string>;
};
export const Fetch = async ({
  endpoint,
  headers,
  baseUrl = urlApi,
  method = "GET",
}: FetchProps) => {
  const options: Partial<FetchProps> = {
    method,
  };
  if (headers) {
    Object.assign(options, headers);
  }
  try {
    const res = await fetch((baseUrl || urlApi) + (endpoint || ""), options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in fetch");
    return [];
  }
};
