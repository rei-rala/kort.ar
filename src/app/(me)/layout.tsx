import React from "react";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { MeLayout } from "@/components/layouts";
import authOptions from "@/libs/nextAuth";

const rubik = Rubik({ subsets: ["latin"] });
const title = process.env.BRAND;

export const metadata: Metadata = {
  title,
  description: "Crea, acorta y centraliza tus links en un solo lugar!",
};

export default async function MePageLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  return <MeLayout brandFont={rubik.className}>{children}</MeLayout>;
}
