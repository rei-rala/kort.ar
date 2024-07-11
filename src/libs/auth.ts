import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const config = {
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
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(config);
