
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';

export async function GET(req: NextRequest, res: NextResponse) {
  const id = "65a020a5b054aafa7b2ef51c";
    try {
      const project = await prisma.project.findUnique({
        where: { id: String(id) },
      });

      if (!project) {
        return NextResponse.json({ message: 'Project not found' });
      }

      // Fetch README content
      const readmeUrl = `https://api.github.com/repos/sidxh/devclans/readme`;
      const readmeResponse = await axios.get(readmeUrl);
      const readmeContent = Buffer.from(readmeResponse.data.content, 'base64').toString();

      // Fetch CONTRIBUTING content
      const contributingUrl = `https://api.github.com/repos/sidxh/devclans/contents/CONTRIBUTING.md`;
      const contributingResponse = await axios.get(contributingUrl);
      const contributingContent = Buffer.from(contributingResponse.data.content, 'base64').toString();

      return NextResponse.json({
        id: project.id,
        name: project.name,
        readme: readmeContent,
        contributing: contributingContent,
        // Add more fields as needed
      });
    } catch (error) {
      console.error('Error fetching project details:', error);
      return NextResponse.json({ message: 'Internal Server Error' });
    }
  }
