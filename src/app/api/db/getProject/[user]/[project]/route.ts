import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const { user, project } = req.query;

    if (!user || typeof user !== 'string') {
        return res.status(400).json({ message: 'Invalid user parameter' });
    }

    try {
        const projectData = await prisma.project.findUnique({
            where: {
                ownerId: user,
                id: project
            },
        });

        if (projectData) {
            return res.status(200).json(projectData);
        } else {
            return res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { handler as GET };