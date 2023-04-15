import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";
import { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  if (!user?.id) {
    return res.status(401).end();
  }
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    return res.status(404).end();
  }
  return res.send({ ...dbUser });
}

export default withApiSession(handler);
