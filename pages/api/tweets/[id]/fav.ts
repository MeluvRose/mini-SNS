import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      query: { id },
      session: { user },
    } = req;
    const alreadyExists = await db.fav.findFirst({
      where: {
        tweetId: +id!.toString(),
        userId: user?.id,
      },
    });

    if (alreadyExists) {
      // delete
      await db.fav.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      // create
      await db.fav.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          tweet: {
            connect: {
              id: +id!.toString(),
            },
          },
        },
      });
    }
    return res.json({
      ok: true,
    });
  }
}

export default withApiSession(handler);
