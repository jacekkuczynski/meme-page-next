import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await getPostsToDisplayWithUser(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const getPostsToDisplayWithUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body = req.body;
  try {
    const postCount = await prisma.post.count();
    const postsToDisplayWithUser = await prisma.post.findMany({
      take: 5,
      where: {
        VotesByUser: {
          every: { userEmail: { equals: body.userEmail } },
        },
      },
      include: {
        VotesByUser: {
          select: { isLiked: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    });
    return res.status(200).json({
      getPostsToDisplayWithUser,
      succes: true,
      postsToDisplayWithUser,
      postCount,
    });
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "error getPostsToDisplayWithUser", succes: false });
  }
};

export default handler;
