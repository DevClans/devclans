import { getDataQuery } from "@/utils/getDataQuery";

async function handler(req: Request) {
  return getDataQuery(req, "users");
}
export { handler as GET };
