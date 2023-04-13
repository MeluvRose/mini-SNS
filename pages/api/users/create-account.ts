import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(200).end();
    }
    await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(201).end();
  }
  return res.status(405).end();
}
