import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await downVoteFromNull(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const downVoteFromNull = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newDownvote = await prisma.post.update({
      where: { id: body.postId },
      data: {
        downvoteCount: {
          increment: 1,
        },
      },
    });
    const addPostToUserVotes = await prisma.votesByUser.create({
      data: {
        postId: body.postId,
        userEmail: body.userEmail,
        isLiked: false,
      },
    });
    return res.status(200).json({ downVoteFromNull, succes: true });
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "error during downVoteFromNull", succes: false });
  }
};

export default handler;
