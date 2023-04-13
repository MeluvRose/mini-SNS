import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).end();
    }
    if (!password || password != user.password) {
      return res.status(400).end();
    }
    req.session.user = {
      id: user.id,
    };
    await req.session.save();
    return res.status(200).end();
  }
  return res.status(405).end();
}

export default withApiSession(handler);
