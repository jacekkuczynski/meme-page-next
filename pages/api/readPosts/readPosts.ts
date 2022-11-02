import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await readPosts(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const readPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newEntry = await prisma.post.create({
      data: {
        upVotes: body.upVotes,
        downVotes: body.downVotes,
        memeTitle: body.memeTitle,
        fileURL: body.fileURL,
      },
    });
    return res.status(200).json({ readPosts, succes: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error reading posts", succes: false });
  }
};

export default handler;
