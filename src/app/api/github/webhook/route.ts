import { NextRequest } from "next/server";

export const handler = async (req: NextRequest) => {
  const body = await req.json();
  console.log("body", body);
  return {
    status: 200,
    body: {
      message: "Hello",
    },
  };
};

export { handler as GET, handler as POST };
