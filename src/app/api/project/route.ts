import { getDataQuery } from "@/utils/getDataQuery";

export async function handler(req: Request) {
  return getDataQuery(req);
}

export { handler as GET };
