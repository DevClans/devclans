
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectModel } from '@/models/models';

const schema = z.object({
  title: z.string(),
  desc: z.string(),
  topics: z.array(z.string()),
  githubLink: z.string(),
  skills: z.array(z.string()).optional(),
  projectLinks: z.array(z.string()).optional(),
  projectDetails: z.object({
    problem: z.string(),
    challenges: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        solution: z.string(),
      })
    ),
    futureGoals: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
        needHelp: z.boolean(),
      })
    ),
    memberReq: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
      })
    ),
  }).optional(),
  team: z.array(z.string()).optional(),
  needMembers: z.enum(['professional', 'student', 'beginner']).optional(),
  imgs: z.array(z.string()).optional(),
  video: z.string().optional(),
  devStage: z.enum(['idea', 'development', 'alpha', 'beta', 'production']).optional(),
  published: z.boolean(),
});

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      const data = schema.parse(req.body);

      // Update the project in the database
      await ProjectModel.create(data);

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error creating project:', error);
      return NextResponse.json({ error: 'Invalid data' });
    }
  }

  return NextResponse.json({ error: 'Method not allowed' });
}