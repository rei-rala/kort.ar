import type { NextApiRequest, NextApiResponse } from "next/types";
import NextAuth from "next-auth";

import authOptions from "./authOptions";

async function auth(req: NextApiRequest, res: NextApiResponse) {
  const handler = await NextAuth(req, res, authOptions);

  return handler;
}

export { auth as GET, auth as POST };
