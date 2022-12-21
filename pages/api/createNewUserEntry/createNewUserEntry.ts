// with auth0 actions - Post User Registration

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '..';

const createNewUserEntry = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const newUser = await prisma.user.create({
      data: {
        userEmail: body.userEmail,
      },
    });
    return res.status(200).json({ createNewUserEntry, succes: true, newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'error creating post', succes: false });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createNewUserEntry(req, res);
  }
  return res.status(405).json({ message: 'Method not allowed', succes: false });
};

export default handler;
