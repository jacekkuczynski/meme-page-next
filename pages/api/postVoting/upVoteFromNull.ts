import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const upVoteFromNull = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const newUpvote = await prisma.post.update({
      where: { id: body.postId },
      data: {
        upvoteCount: {
          increment: 1,
        },
      },
    });
    const addPostToUserVotes = await prisma.votesByUser.create({
      data: {
        postId: body.postId,
        userEmail: body.userEmail,
        isLiked: true,
      },
    });
    return res
      .status(200)
      .json({ upVoteFromNull, succes: true, newUpvote, addPostToUserVotes });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error during upVoteFromNull', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return upVoteFromNull(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
