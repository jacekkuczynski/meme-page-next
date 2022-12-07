import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await getPostsToDisplay(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const getPostsToDisplay = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const postsToDisplay = await prisma.post.findMany({ take: 20 });
    return res
      .status(200)
      .json({ getPostsToDisplay, succes: true, postsToDisplay });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error getPostsToDisplay", succes: false });
  }
};

export default handler;
