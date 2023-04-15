import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";
import { ResponseType } from "@libs/server/withHandler";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            fav: true,
          },
        },
      },
    });
    return res.json({ tweets });
  }
  if (req.method === "POST") {
    const {
      body: { content },
      session: { user },
    } = req;
    const tweet = await db.tweet.create({
      data: {
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ tweet });
  }
}

export default withApiSession(handler);
