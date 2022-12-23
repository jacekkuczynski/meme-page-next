import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';
import { postsFetchedAtOnce } from '../../../config/postsFetchedAtOnce';

const getPostsForInfiniteScroll = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const postsForInfiniteScroll = await prisma.post.findMany({
      take: postsFetchedAtOnce,
      skip: body.postsToSkip,
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    const postCount = await prisma.post.count();
    return res.status(200).json({
      getPostsForInfiniteScroll,
      succes: true,
      postsForInfiniteScroll,
      postCount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getPostsForInfiniteScroll', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getPostsForInfiniteScroll(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
