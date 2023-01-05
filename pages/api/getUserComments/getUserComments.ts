import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const getUserComments = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  try {
    const userComments = await prisma.comment.findMany({
      orderBy: {
        date: 'desc',
      },
      where: { username: body.username },
    });
    return res.status(200).json({
      getUserComments,
      succes: true,
      userComments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error getUserComments', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return getUserComments(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
