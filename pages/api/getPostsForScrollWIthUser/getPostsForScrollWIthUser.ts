import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';
import { postsFetchedAtOnce } from '../../../config/postsFetchedAtOnce';

const getPostsForScrollWIthUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const postsForScrollWIthUser = await prisma.post.findMany({
      take: postsFetchedAtOnce,
      skip: body.postsToSkip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    const postCount = await prisma.post.count();
    return res.status(200).json({
      getPostsForScrollWIthUser,
      succes: true,
      postsForScrollWIthUser,
      postCount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getPostsForScrollWIthUser', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getPostsForScrollWIthUser(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
