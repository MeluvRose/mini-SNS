import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";
import { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await db.tweet.findUnique({
    where: {
      id: +id!.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.fav.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  return res.json({ tweet, isLiked });
}

export default withApiSession(handler);
