import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';
import { postsFetchedAtOnce } from '../../../config/postsFetchedAtOnce';

const getpostsForScrollWithUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const postsForScrollWithUser = await prisma.post.findMany({
      take: postsFetchedAtOnce,
      skip: body.postsToSkip,
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
    const postCount = await prisma.post.count();
    return res.status(200).json({
      getpostsForScrollWithUser,
      succes: true,
      postsForScrollWithUser,
      postCount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getpostsForScrollWithUser', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getpostsForScrollWithUser(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
