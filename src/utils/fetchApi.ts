import { urlApi } from "@/constants";
import { Method } from "axios";
type FetchProps = {
  endpoint: string;
  method?: Method;
  headers?: any;
  baseUrl?: string;
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
    options["headers"] = headers;
  }
  try {
    const res = await fetch(baseUrl + endpoint, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error in getProducts");
    return [];
  }
};
