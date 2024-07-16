import prisma from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const config = {
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  session: {
    strategy: "database",
    maxAge: 7 * 24 * 60 * 60,
  },
  trustHost: true, // TODO: remover - solo para deploy de producción
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
