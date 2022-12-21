import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const getPostsToDisplayWithUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const postCount = await prisma.post.count();
    const postsToDisplayWithUser = await prisma.post.findMany({
      take: 10,
      where: {
        VotesByUser: {
          every: { userEmail: { equals: body.userEmail } },
        },
      },
      include: {
        VotesByUser: {
          select: { isLiked: true },
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
  if (req.method === 'GET') {
    return getPostsToDisplayWithUser(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
