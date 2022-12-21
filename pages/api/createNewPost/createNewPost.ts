import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const createNewPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const newPost = await prisma.post.create({
      data: {
        upvoteCount: body.upvoteCount,
        downvoteCount: body.downvoteCount,
        memeTitle: body.memeTitle,
        fileURL: body.fileURL,
        username: body.username,
        userAvatarURL: body.userAvatarURL,
      },
    });
    return res.status(200).json({ createNewPost, succes: true, newPost });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error creating post', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createNewPost(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
