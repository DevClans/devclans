import { getInstalledReposFunc } from "@/utils/getInstalledReposFunc";
import { NextRequest, NextResponse } from "next/server";

const handler = async (req: NextRequest) => {
  try {
    const reposData = await getInstalledReposFunc();
    return NextResponse.json({ message: "success", repos: reposData });
  } catch (error: any) {
    console.error("error in github/appcallback", error);
    return NextResponse.json({ message: "error", error: error?.message });
  }
};
export { handler as GET };

// const reposGQL = await api?.api.graphql(`
//   query {
//     repository(owner: "auspy", name: "auspy") {
//         name
//         createdAt
//     }
//   }`);
// console.log("repos", repos?.data, reposGQL);
