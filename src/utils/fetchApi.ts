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
  method?: Method;
  baseUrl?: string;
  headers?: any;
  type?: "nan" | "an"; //nan means no access needed and an means access needed
  token?: string;
};

export const Fetch = async ({
  endpoint,
  headers,
  baseUrl = urlApi,
  method = "GET",
  token,
  type = "nan",
}: FetchProps) => {
  const options: Partial<FetchProps> = {
    method,
    headers: {
      "cache-control": "force-cache",
      "Content-Type": "application/json",
      "x-d-a": type, // d-a means devclans-access
    },
  };
  if (token) {
    options["headers"]["Authorization"] = `Bearer ${token}`;
  }
  if (headers) {
    Object.assign(options["headers"], headers);
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
