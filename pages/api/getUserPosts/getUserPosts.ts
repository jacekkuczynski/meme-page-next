import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const getUserPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const userPosts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: { username: body.username },
    });
    return res.status(200).json({
      getUserPosts,
      succes: true,
      userPosts,
    });
  } catch (error) {
    return res.status(500).json({ error: 'error getUserPosts', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getUserPosts(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
