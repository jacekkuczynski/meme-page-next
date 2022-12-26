import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';
import { postsFetchedAtOnce } from '../../../config/postsFetchedAtOnce';

const getPostsToDisplayWithUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const postCount = await prisma.post.count();
    const postsToDisplayWithUser = await prisma.post.findMany({
      take: postsFetchedAtOnce,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        VotesByUser: {
          where: {
            userEmail: body.userEmail,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
    return res.status(200).json({
      getPostsToDisplayWithUser,
      succes: true,
      postsToDisplayWithUser,
      postCount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getPostsToDisplayWithUser', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getPostsToDisplayWithUser(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
