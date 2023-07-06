import type { AuthOptions } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next/types";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const clientId = String(process.env.GOOGLE_CLIENT_ID);
const clientSecret = String(process.env.GOOGLE_CLIENT_SECRET);
const secret = String(process.env.SECRET);

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret,
};

async function auth(req: NextApiRequest, res: NextApiResponse) {
  const handler = await NextAuth(req, res, authOptions);

  return handler;
}

export { auth as GET, auth as POST };
