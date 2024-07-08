import NextAuth from "next-auth";

import authOptions from "@/libs/nextAuth";
import { NextApiRequest, NextApiResponse } from "next";

async function auth(req: NextApiRequest, res: NextApiResponse) {
  const handler = await NextAuth(req, res, authOptions);

  return handler;
}

export { auth as GET, auth as POST };
