import React from "react";
import type { Metadata } from "next";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import authOptions from "@/libs/nextAuth";
import { Navbar } from "@/components/shared";

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

  return (
    <>
      <Navbar />
      {React.Children.map(children, (child, index) => (
        <section key={`me-layout-child:${index + 1}`}>{child}</section>
      ))}
    </>
  );
}
