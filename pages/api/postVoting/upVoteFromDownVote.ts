import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await upVoteFromDownVote(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const upVoteFromDownVote = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body = req.body;
  try {
    const newDownvote = await prisma.post.update({
      where: { id: body.postId },
      data: {
        upvoteCount: {
          increment: 1,
        },
        downvoteCount: {
          decrement: 1,
        },
      },
    });
    return res.status(200).json({ upVoteFromDownVote, succes: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error during voting", succes: false });
  }
};

export default handler;
