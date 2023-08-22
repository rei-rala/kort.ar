import React from "react";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import MeLayoutComponents from "@/components/_layouts/me/MeLayoutComponents";
import authOptions from "../api/auth/[...nextauth]/authOptions";

const rubik = Rubik({ subsets: ["latin"] });
const title = process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default async function MeLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <MeLayoutComponents className="" brandFont={rubik.className}>
      {children}
    </MeLayoutComponents>
  );
}
