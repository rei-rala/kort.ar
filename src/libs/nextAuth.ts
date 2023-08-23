import type { AuthOptions } from "next-auth";
import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

const clientId = String(process.env.GOOGLE_CLIENT_ID);
const clientSecret = String(process.env.GOOGLE_CLIENT_SECRET);
const secret = String(process.env.SECRET);

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
