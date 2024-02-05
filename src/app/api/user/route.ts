import { getDataQuery } from "@/utils/getDataQuery";

async function handler(req: Request) {
  return getDataQuery(req.url, "users");
}
export { handler as GET };
