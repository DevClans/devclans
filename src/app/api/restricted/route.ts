import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/utils/auth/auth";

 async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req ,res, authOptions);

    if (session) {
      res.status(200).json({
        content: "This is protected content. You can access this content because you are signed in.",
      });
    } else {
      res.status(401).json({
        error: "You must be signed in to view the protected content on this page.",
      });
    }
  } catch (error) {
    console.error("Error in authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handler as GET } 
