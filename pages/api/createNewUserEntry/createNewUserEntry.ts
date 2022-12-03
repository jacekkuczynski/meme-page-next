import { prisma } from "..";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await createNewUserEntry(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", succes: false });
  }
};

const createNewUserEntry = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const body = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        userEmail: body.userEmail,
      },
    });
    return res.status(200).json({ createNewUserEntry, succes: true, newUser });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "error creating post", succes: false });
  }
};

export default handler;
