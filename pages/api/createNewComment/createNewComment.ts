// import { prisma } from "..";
// import type { NextApiRequest, NextApiResponse } from "next";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     return await createNewComment(req, res);
//   } else {
//     return res
//       .status(405)
//       .json({ message: "Method not allowed", succes: false });
//   }
// };

// const createNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
//   const body = req.body;
//   try {
//     const newComment = await prisma.comment.create({
//       data: {
// postId: body.postId,
// username: body.username,
// commentContent: body.commentContent,
//       },
//     });
//     return res.status(200).json({ createNewComment, succes: true });
//   } catch (error) {
//     console.error("Request error", error);
//     res.status(500).json({ error: "error creating comment", succes: false });
//   }
// };

// export default handler;

import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await createNewComment(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const createNewComment = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newPost = await prisma.comment.create({
      data: {
        postId: body.postId,
        username: body.username,
        commentContent: body.commentContent,
      },
    });
    return res.status(200).json({ createNewComment, succes: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error creating post", succes: false });
  }
};

export default handler;
