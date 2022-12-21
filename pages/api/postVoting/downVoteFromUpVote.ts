import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const downVoteFromUpVote = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const newDownvote = await prisma.post.update({
      where: { id: body.postId },
      data: {
        downvoteCount: {
          increment: 1,
        },
        upvoteCount: {
          decrement: 1,
        },
      },
    });
    const addPostToUserVotes = await prisma.votesByUser.update({
      where: {
        postId_userEmail: { postId: body.postId, userEmail: body.userEmail },
      },
      data: {
        isLiked: false,
      },
    });
    return res.status(200).json({
      downVoteFromUpVote,
      succes: true,
      newDownvote,
      addPostToUserVotes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error during downVoteFromUpVote', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return downVoteFromUpVote(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
