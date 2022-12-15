import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await getVotesForPost(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const getVotesForPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
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
    res.status(500).json({
      error: "error getVotesForPost",
      succes: false,
    });
  }
};

export default handler;
