import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const getPostsToDisplay = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const postsToDisplay = await prisma.post.findMany({
      take: 10,
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return res
      .status(200)
      .json({ getPostsToDisplay, succes: true, postsToDisplay });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getPostsToDisplay', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getPostsToDisplay(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
