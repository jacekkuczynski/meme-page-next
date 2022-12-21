import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const getVotesForPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const votesForPost = await prisma.votesByUser.findUnique({
      where: {
        postId_userEmail: { postId: body.postId, userEmail: body.userEmail },
      },
    });
    return res.status(200).json({
      getVotesForPost,
      succes: true,
      votesForPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'error getVotesForPost',
      succes: false,
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getVotesForPost(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
