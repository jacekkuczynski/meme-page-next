import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await createNewPost(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const createNewPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newPost = await prisma.post.create({
      data: {
        upvoteCount: body.upvoteCount,
        downvoteCount: body.downvoteCount,
        memeTitle: body.memeTitle,
        fileURL: body.fileURL,
        username: body.username,
        userAvatarURL: body.userAvatarURL,
      },
    });
    return res.status(200).json({ createNewPost, succes: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error creating post", succes: false });
  }
};

export default handler;
