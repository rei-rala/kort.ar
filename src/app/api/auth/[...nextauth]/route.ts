import type { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";

import authOptions from "@/libs/nextAuth";
import { NextApiRequest, NextApiResponse } from "next";

async function auth(req: NextRequest, res: NextResponse) {
  const handler = await NextAuth(
    req as unknown as NextApiRequest, // WTF?
    res as unknown as NextApiResponse, // WTF?
    authOptions
  );

  return handler;
}

export { auth as GET, auth as POST };
