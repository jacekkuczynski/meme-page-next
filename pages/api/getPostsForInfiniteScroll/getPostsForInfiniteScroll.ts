import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const getPostsForInfiniteScroll = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  // const { body } = req;
  try {
    const postsForInfiniteScroll = await prisma.post.findMany({
      take: 5,
      skip: 5,
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return res.status(200).json({
      getPostsForInfiniteScroll,
      succes: true,
      postsForInfiniteScroll,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getPostsForInfiniteScroll', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getPostsForInfiniteScroll(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
