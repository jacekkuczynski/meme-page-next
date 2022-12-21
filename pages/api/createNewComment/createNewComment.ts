import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const createNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const newComment = await prisma.comment.create({
      data: {
        postId: body.postId,
        username: body.username,
        commentContent: body.commentContent,
      },
    });
    return res.status(200).json({ createNewComment, succes: true, newComment });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error creating post', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createNewComment(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
