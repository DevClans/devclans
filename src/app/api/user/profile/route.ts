// pages/api/user/profile.ts
import { z } from "zod";
import { getSession } from "next-auth/react";
import { UserModel } from "@/mongodb/models";
import { NextRequest, NextResponse } from "next/server";
import { contactMethods } from "@/lib/contactMethods";
import { skills } from "@/lib/skills";

const schema = z.object({
  githubId: z.string(),
  bio: z.string().max(180),
  contactMethod: z.enum(contactMethods),
  skills: z.array(z.enum(skills)),
  currentCompany: z.string(),
  careerGoal: z.enum(["remote", "faang", "startup"]),
  proudAchievement: z.string(),
  recentWork: z.string(),
});

export default async function POST(req: NextRequest, res: NextResponse) {
  // Ensure the user is authenticated
  const session = await getSession({ req: req as any });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const { user } = session;

  if (req.method === "POST") {
    try {
      const data = schema.parse(req.body);

      // Update the user's profile in the database
      await UserModel.updateOne({ discordId: user?.name }, data, {
        upsert: true,
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error updating user profile:", error);
      return NextResponse.json({ error: "Invalid data" });
    }
  }

  return NextResponse.json({ error: "Method not allowed" });
}
