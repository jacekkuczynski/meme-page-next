import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await getPostsForInfiniteScroll(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const getPostsForInfiniteScroll = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body = req.body;
  try {
    const postsForInfiniteScroll = await prisma.post.findMany({
      take: 5,
      skip: 5,
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return res.status(200).json({
      getPostsForInfiniteScroll,
      succes: true,
      postsForInfiniteScroll,
    });
  } catch (error) {
    console.error("Request error", error);
    res
      .status(500)
      .json({ error: "error getPostsForInfiniteScroll", succes: false });
  }
};

export default handler;
