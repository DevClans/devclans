import { getDataQuery } from "@/utils/getDataQuery";

async function handler(req: Request) {
  return getDataQuery(req.url);
}

export { handler as GET };
