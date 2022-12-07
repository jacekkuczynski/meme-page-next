import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await findPostsWithVotes(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const findPostsWithVotes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body = req.body;
  try {
    const postsWithVotes = await prisma.votesByUser.findMany({
      where: {
        postId: { in: body.postsIds },
        userEmail: body.userEmail,
      },
    });
    return res
      .status(200)
      .json({ findPostsWithVotes, succes: true, postsWithVotes });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error findPostsWithVotes", succes: false });
  }
};

export default handler;
