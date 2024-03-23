import { getDataQuery } from "@/utils/getDataQuery";

async function handler(req: Request):Promise<any>{
  return getDataQuery(req.url);
}

export { handler as GET };
